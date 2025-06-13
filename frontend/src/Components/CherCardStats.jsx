

const StatsSection = () => {
  return (
    <section className="">
      <div className="container">
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border p-8 shadow-sm bg-background">
            <h3 className="text-4xl font-bold text-primary">134</h3>
            <p className="mt-2 text-lg font-medium text-muted-foreground">
              Publications scientifiques
            </p>
          </div>

          <div className="rounded-xl border border-border p-8 shadow-sm bg-background">
            <h3 className="text-4xl font-bold text-primary">26</h3>
            <p className="mt-2 text-lg font-medium text-muted-foreground">
              Projets de recherche
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { StatsSection };



