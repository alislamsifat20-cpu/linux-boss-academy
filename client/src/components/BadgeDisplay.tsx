interface BadgeDisplayProps {
  icon: string;
  name: string;
  description: string;
  earned: boolean;
}

export default function BadgeDisplay({ icon, name, description, earned }: BadgeDisplayProps) {
  return (
    <div className={`text-center p-4 rounded-lg border ${earned ? 'bg-accent/10 border-accent' : 'bg-muted/30 border-muted'}`}>
      <div className={`text-4xl mb-2 ${earned ? '' : 'opacity-50 grayscale'}`}>{icon}</div>
      <h3 className="font-semibold text-sm mb-1">{name}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
