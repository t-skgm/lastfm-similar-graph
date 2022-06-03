import { h, FunctionComponent } from 'preact'
import { RoutableProps } from 'preact-router'
import { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'preact/hooks'
import style from './style.module.css'
import { useLastFmClient } from '../../context/lastfmClient'
import { LastFmMethodResponseMap } from '../../lib/LastFmClient'

import Cytoscape from 'cytoscape'
import { ModalView } from '../../components/Modal/ModalView'
import { useModalState } from '../../components/Modal/useModal'

const Graph: FunctionComponent<RoutableProps> = () => {
  const { lastFmClient } = useLastFmClient()
  const cy = useRef<Cytoscape.Core>()
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Cytoscape.NodeSingular | null>(null)

  const { handleClose, handleOpen, isOpen } = useModalState()

  useLayoutEffect(() => {
    cy.current = initCy()
  }, [])

  useEffect(() => {
    cy.current?.one('tap', 'node', e => {
      const node = e.target as Cytoscape.NodeSingular
      console.log(`[on select node]`, node.data())
      setSelected(node)
      handleOpen()
    })
  }, [handleOpen])

  const handleStartSearch = useCallback(
    async (e: h.JSX.TargetedEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        const resInfo = await lastFmClient.request({
          method: 'artist.getInfo',
          params: { artist: search }
        })
        const res = await lastFmClient.request({
          method: 'artist.getSimilar',
          params: { artist: search, limit: 10 }
        })
        const sub = resInfo.artist
        const sims = res.similarartists.artist.filter(a => a.url !== undefined)
        console.log('-------', sub, res)

        cy.current?.add([
          {
            group: 'nodes',
            data: {
              id: sub.url,
              name: sub.name,
              url: sub.url,
              imageUrl: sub.image[sub.image.length - 1]?.['#text'],
              bioContent: sub.bio.content
            },
            selected: true
          },
          ...sims.map(
            (sim): Cytoscape.ElementDefinition => ({
              group: 'nodes',
              data: {
                id: sim.url,
                name: sim.name,
                url: sim.url,
                imageUrl: sim.image[sim.image.length - 1]?.['#text']
              }
            })
          ),
          ...sims.map(
            (sim): Cytoscape.ElementDefinition => ({
              group: 'edges',
              data: { id: `${sim.url}_edge`, source: sub.url, target: sim.url }
            })
          )
        ])
        cy.current?.layout({ name: 'cose', fit: true, animate: true }).run()
        // console.log('handleStartSearch', res.similarartists)
      } catch (e) {
        console.warn(e)
      }
    },
    [lastFmClient, search]
  )

  const getSimilar = async ({ artistName, parentId }: { artistName: string; parentId: string }) => {
    const res = await lastFmClient.request({
      method: 'artist.getSimilar',
      params: { artist: artistName, limit: 10 }
    })
    const sims = res.similarartists.artist.filter(a => a.url !== undefined)
    const fetchedIds = sims.map(s => s.url)

    const existNodes = cy.current?.filter(el => fetchedIds.includes(el.id())).toArray() ?? []
    const newSims = sims.filter(s => existNodes.map(n => n.id()).includes(s.url))

    console.log('----', existNodes, newSims)

    cy.current?.add([
      ...newSims.map(
        (sim): Cytoscape.ElementDefinition => ({
          group: 'nodes',
          data: {
            id: sim.url,
            name: sim.name,
            url: sim.url,
            imageUrl: sim.image[sim.image.length - 1]?.['#text']
          }
        })
      ),
      ...newSims.map(
        (sim): Cytoscape.ElementDefinition => ({
          group: 'edges',
          data: { id: `${sim.url}_edge`, source: parentId, target: sim.url }
        })
      )
    ])

    cy.current?.layout({ name: 'cose', fit: true, animate: true }).run()
  }

  const handleFindMore = async () => {
    await getSimilar({ artistName: selected?.data('name'), parentId: selected?.data('url') })
    handleClose()
  }

  return (
    <div class={style.wrapper}>
      <ModalView isOpen={isOpen} onClose={handleClose} title={selected?.data('name')}>
        <p>
          <img src={selected?.data('imageUrl')} />
        </p>
        <p style={{ backgroundColor: '#fff' }}>
          <a href={selected?.data('url')} target="_blank" rel="noreferrer">
            Last.fm page
          </a>
        </p>
        <button onClick={handleFindMore}>Find more!</button>
      </ModalView>

      <h1>Graph</h1>
      <div>
        <form onSubmit={handleStartSearch}>
          <button class={style.button}>Search!</button>
          <input
            type="text"
            value={search}
            onChange={e => {
              setSearch((e.target as HTMLInputElement)?.value)
            }}
          />
        </form>
      </div>

      <div id="cytoscape" class={style.canvas} />
    </div>
  )
}

const initCy = () => {
  const _cy = Cytoscape({
    container: document.getElementById('cytoscape'),
    layout: { name: 'circle', fit: true, animate: true },
    style: [
      {
        selector: 'node[name]',
        style: {
          label: 'data(name)'
        }
      }
    ]
  })

  return _cy
}

export default Graph
