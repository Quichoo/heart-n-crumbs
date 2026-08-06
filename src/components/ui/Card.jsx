function Card({ title, icon, children }) {
  return (
    <div className="bg-card-bg/60 border border-border/10 rounded-md shadow-md p-6">
      {title && (
        <h2 className="flex items-center gap-2 font-body font-semibold text-stone-800 mb-4">
          {icon && <span>{icon}</span>} {title}
        </h2>
      )}
      {children}
    </div>
  );
}

export default Card;
