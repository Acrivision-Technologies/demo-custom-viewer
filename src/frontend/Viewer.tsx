import { ColorDef, Environment, SkyBox, SkyGradient } from "@itwin/core-common";
import { FitViewTool, IModelApp, IModelConnection, ScreenViewport, StandardViewId, ViewState3d } from "@itwin/core-frontend";
import { MeasureTools, MeasureToolsUiItemsProvider } from "@itwin/measure-tools-react";
import { PropertyGridManager, PropertyGridUiItemsProvider } from "@itwin/property-grid-react";
import { TreeWidget, TreeWidgetUiItemsProvider } from "@itwin/tree-widget-react";
import { ViewerPerformance, Viewer, ViewerNavigationToolsProvider, ViewerContentToolsProvider, ViewerStatusbarItemsProvider, ViewerAuthorizationClient } from "@itwin/web-viewer-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { authorizationService } from "./Services/AuthorizationService";
import { BeEvent } from "@itwin/core-bentley";
import { ElementCollectionProvider } from "./UiProviders/ElementCollectionProvider";


const INITIAL_ALPHA = 0.5;
const INITIAL_COLORS = {
    backgroundColor: ColorDef.blue.withAlpha(INITIAL_ALPHA * 255),
    nadirColor: ColorDef.fromTbgr(0),
    skyColor: ColorDef.fromTbgr(16776960),
    groundColor: ColorDef.fromTbgr(9221330),
    zenithColor: ColorDef.fromTbgr(16711680),
};

export const CustomViewer = (props: any) => {

    const [iModelConnection, setIModelConnection] = useState<IModelConnection>();

    useEffect(()=> {
        console.log("inside CustomViewer useeffect");
    })

    const oniModelReady = useCallback(async (iModelConnection: IModelConnection) => {
        setIModelConnection(iModelConnection);
    }, []);

    /** NOTE: This function will execute the "Fit View" tool after the iModel is loaded into the Viewer.
     * This will provide an "optimal" view of the model. However, it will override any default views that are
     * stored in the iModel. Delete this function and the prop that it is passed to if you prefer
     * to honor default views when they are present instead (the Viewer will still apply a similar function to iModels that do not have a default view).
     */
    const viewConfiguration = useCallback((viewPort: ScreenViewport) => {
        // default execute the fitview tool and use the iso standard view after tile trees are loaded
        viewPort.view.adjustAspectRatio(window.innerWidth / window.innerHeight);
        const { backgroundColor, nadirColor, skyColor, groundColor, zenithColor } = { ...INITIAL_COLORS };

        const gradient = SkyGradient.create({
            nadirColor, skyColor, groundColor, zenithColor
        });

        let environment = Environment.create({
            sky: SkyBox.createGradient(gradient),
            displaySky: true,
            displayGround: true
        });

        (viewPort.view as ViewState3d).displayStyle.environment = environment;

        const tileTreesLoaded = () => {
            return new Promise((resolve, reject) => {
                const start = new Date();
                const intvl = setInterval(() => {
                    if (viewPort.areAllTileTreesLoaded) {
                        ViewerPerformance.addMark("TilesLoaded");
                        ViewerPerformance.addMeasure(
                            "TileTreesLoaded",
                            "ViewerStarting",
                            "TilesLoaded"
                        );
                        clearInterval(intvl);
                        resolve(true);
                    }
                    const now = new Date();
                    // after 20 seconds, stop waiting and fit the view
                    if (now.getTime() - start.getTime() > 20000) {
                        reject();
                    }
                }, 100);
            });
        };

        tileTreesLoaded().finally(() => {
            void IModelApp.tools.run(FitViewTool.toolId, viewPort, true, false);
            // viewPort.view.viewFlags = viewPort.viewFlags.copy({ shadows: false, grid: false, visibleEdges: false, fill: false, styles: false, backgroundMap: true})
            viewPort.view.setStandardRotation(StandardViewId.Iso);
            IModelApp.startup({
              mapLayerOptions: {
                BingMaps: {
                  key: "key",
                  value: "Ar2jXyfOourV1HfEwUf-f3H2hZF9rrjHGKK_MiAZH2OghqMQKk9ghAhRr9OYPzR1"
                }
              }
            })
            // IModelApp.viewManager.selectedView!.overrideDisplayStyle({
            //   backgroundColor: ColorDef.computeTbgrFromString("white"),
            // })
        });
    }, []);

    const viewCreatorOptions = useMemo(
        () => ({ viewportConfigurer: viewConfiguration }),
        [viewConfiguration]
    );

    const onIModelAppInit = useCallback(async () => {
        await TreeWidget.initialize();
        await PropertyGridManager.initialize();
        await MeasureTools.startup();
    }, []);

    // return <div>Hello--</div>

    return <Viewer
        iTwinId={props.iTwinId}
        iModelId={props.iModelId}
        changeSetId={props.changeSetId}
        authClient={props.viewAuthClient}
        onIModelConnected={oniModelReady}
        viewCreatorOptions={viewCreatorOptions}
        enablePerformanceMonitors={true} // see description in the README (https://www.npmjs.com/package/@itwin/web-viewer-react)
        onIModelAppInit={onIModelAppInit}
        uiProviders={[
            new ViewerNavigationToolsProvider(),
            new ViewerContentToolsProvider({
                vertical: {
                    measureGroup: false,
                },
            }),
            new ViewerStatusbarItemsProvider(),
            new TreeWidgetUiItemsProvider(),
            new PropertyGridUiItemsProvider({
                enableCopyingPropertyText: true,
            }),
            new MeasureToolsUiItemsProvider(),
            new ElementCollectionProvider(iModelConnection)
        ]}
    />

}