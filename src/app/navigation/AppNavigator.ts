export type AppRouteIntent =
{
    PanelId: string;
    Payload?: unknown;
};

export class AppNavigator
{
    private readonly NavigateHandler: (Path: string) => void;

    public constructor(NavigateHandler: (Path: string) => void)
    {
        this.NavigateHandler = NavigateHandler;
    }

    public Navigate(Intent: AppRouteIntent): void
    {
        const PanelRoutes: Record<string, string> =
        {
            ArenaLobbyBasePanel: "/",
            BalanceGameBasePanel: "/game",
            ArenaResultBasePanel: "/result",
        };
        const Route = PanelRoutes[Intent.PanelId];

        if(Route !== undefined)
        {
            this.NavigateHandler(Route);
        }
    }
}
