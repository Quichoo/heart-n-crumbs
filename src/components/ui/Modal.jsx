function Modal({ onClose, children, maxWidth = "max-w-md" }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className={`modal-in bg-white rounded-md p-6 w-full ${maxWidth} max-h-[85vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
