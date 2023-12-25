import { useCallback } from 'react';
import { useEffect } from 'react'
import css from './modal.module.css'

const Modal = ({ onClose, children}) => {

    const handlerClick = useCallback((e) => {
        if (e.code === 'Escape') onClose();
        if (e.currentTarget === e.target) onClose();
    }, [onClose])

    useEffect(() => {
        window.addEventListener('keydown', handlerClick)

        return (() => {
             document.removeEventListener('keydown', handlerClick);
        })
    }, [handlerClick])

    return (
        <div className={css.Overlay} onClick={handlerClick}>
            <div className={css.Modal} onClick={handlerClick}>
                {children}
            </div>
        </div>
    )
}


export default Modal