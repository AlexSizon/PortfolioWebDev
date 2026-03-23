export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
      <p className="text-slate-400 mb-6">Demo app configuration and account preferences.</p>

      <div className="glass-card p-6 max-w-2xl">
        <h2 className="text-lg font-semibold text-white mb-3">Demo Mode</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          This is a read-optimized demo environment. Destructive operations such as delete
          are disabled for the demo user, while interactive flows like kanban drag-and-drop,
          search, filtering, and modal forms remain enabled.
        </p>
      </div>
    </div>
  );
}
