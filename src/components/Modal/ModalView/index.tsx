import type { MouseEvent } from 'react'
// import { useCallback, useEffect, useState } from 'preact/hooks'
import style from './style.module.css'
import { FunctionComponent } from 'preact'

type Props = { isOpen: boolean; onClose: () => void; title: string }

export const ModalView: FunctionComponent<Props> = ({ isOpen, onClose, title, children }) => {
  const onDialogClick = (event: MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <aside onClick={onClose} className={`${style.modal} ${isOpen ? style.open : ``}`}>
      {isOpen ? (
        <section onClick={onDialogClick} className={style.dialog}>
          <div className={style.header}>
            <h1>{title}</h1>
            <button type="button" onClick={onClose}>
              x
            </button>
          </div>
          <div className={style.content}>{children}</div>
        </section>
      ) : null}
    </aside>
  )
}

// type Props = {
//   isOpen?: boolean
// }

// export const Modal = ({ isOpen }: Props) => {
//   const [_isOpen, setIsOpen] = useState(isOpen)

//   const onOpen = useCallback(() => {
//     if (!_isOpen) {
//       setIsOpen(true)
//     }
//   }, [_isOpen])

//   const onClose = useCallback(() => {
//     if (_isOpen) {
//       setIsOpen(false)
//     }
//   }, [_isOpen])

//   const onDialogClick = useCallback<MouseEventHandler<HTMLElement>>(event => {
//     event.stopPropagation()
//   }, [])

//   const OpenModal = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
//     <button type="button" onClick={onOpen} {...props} />
//   )

//   const CloseModal = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
//     <button type="button" onClick={onClose} {...props} />
//   )

//   const ModalContent = ({ ...props }: ButtonHTMLAttributes<HTMLElement>) => (
//     <section onClick={onDialogClick} {...props} className={`${style.dialog}`} />
//   )

//   const ModalOverlay = ({ ...props }: ButtonHTMLAttributes<HTMLElement>) => (
//     <aside onClick={onClose} {...props} className={`${style.modal} ${isOpen ? style.open : ``}`} />
//   )

//   return {
//     isOpen,
//     onOpen,
//     onClose,
//     onDialogClick,
//     CloseModal,
//     ModalContent,
//     ModalOverlay,
//     OpenModal
//   }
// }

// export class Modal extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       isOpen: props.isOpen
//     }
//   }

//   onOpen = () => {
//     if (!this.state.isOpen) {
//       this.setState({
//         isOpen: true
//       })
//     }
//   }

//   onClose = () => {
//     if (this.state.isOpen) {
//       this.setState({
//         isOpen: false
//       })
//     }
//   }

//   listenKeyboard = event => {
//     if (event.key === `Escape` || event.keyCode === 27) {
//       this.onClose()
//     }
//   }

//   componentDidMount = () => {
//     window.addEventListener(`keydown`, this.listenKeyboard.bind(this), true)
//   }

//   componentWillUnmount = () => {
//     window.removeEventListener(`keydown`, this.listenKeyboard.bind(this), true)
//   }

//   onDialogClick = event => {
//     event.stopPropagation()
//   }

//   render({ children }, { isOpen }) {
//     return children[0]({
//       isOpen,
//       onOpen: this.onOpen,
//       onClose: this.onClose,
//       onDialogClick: this.onDialogClick,
//       CloseModal: props => (
//         <button type="button" onClick={this.onClose} {...props} />
//       ),
//       ModalContent: ({ className, ...props }) => (
//         <section
//           onClick={this.onDialogClick}
//           {...props}
//           className={`${className ? `${className} ` : ``}dialog`}
//         />
//       ),
//       ModalOverlay: ({ className, ...props }) => (
//         <aside
//           onClick={this.onClose}
//           {...props}
//           className={`${className ? `${className} ` : ``}modal ${
//             isOpen ? `open` : ``
//           }`}
//         />
//       ),
//       OpenModal: props => (
//         <button type="button" onClick={this.onOpen} {...props} />
//       )
//     })
//   }
// }
