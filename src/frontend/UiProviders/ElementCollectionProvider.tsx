import { CommonWidgetProps, StagePanelLocation, StagePanelSection, UiItemsProvider, WidgetState } from "@itwin/appui-react";
import { ElementCollectionProviderComponent } from "../Components/ElementCollectionProviderComponent";
import { IModelConnection } from "@itwin/core-frontend";
import { useAppSelector } from "../store/hooks";
import { RootState, store } from "../store";
import { Provider } from "react-redux";


export class ElementCollectionProvider implements UiItemsProvider {
    public readonly id: string = 'ElementCollectionProvider';
    public imodelConnection: IModelConnection | undefined;
    constructor(imodelConnection: IModelConnection | undefined) {
        this.imodelConnection = imodelConnection
    }

    public provideWidgets(stageId: string, stageUsage: string, location: StagePanelLocation, section?: StagePanelSection): any {
        const widgets: CommonWidgetProps[] = [];
        if (
            location === StagePanelLocation.Bottom &&
            section === StagePanelSection.Start
        ) {
            const backgroundColorWidget: CommonWidgetProps = {
                id: 'ElementCollectionProvider',
                label: 'Tower Elements',
                defaultState: WidgetState.Closed,
                // applicationData: useAppSelector((state:RootState) => state.clientIModel),
                getWidgetContent: () => <Provider store={store}><ElementCollectionProviderComponent imodelConnection={this.imodelConnection}/></Provider>
            };

            widgets.push(backgroundColorWidget);
        }

        return widgets;

    }
}