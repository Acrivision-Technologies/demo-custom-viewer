/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { ColorDef, FeatureOverrideType } from "@itwin/core-common";
import { EmphasizeElements, IModelApp, StandardViewId, ViewChangeOptions, ZoomToOptions } from "@itwin/core-frontend";

export type zoomView = "current" | "standard" | "relative";

export interface ZoomOptions {
    animateEnable: boolean;
    zoomView: zoomView;
    view: StandardViewId;
}

export class ZoomToElementService {

    public static zoomToElements = async (elements: string[], options: ZoomOptions) => {
        const viewChangeOpts: ViewChangeOptions = {
            animateFrustumChange: options.animateEnable,
        };

        const zoomToOpts: ZoomToOptions = {};
        const vp = IModelApp.viewManager.selectedView;

        // Set the view to point at a volume containing the list of elements
        if (vp) {
            const provider = EmphasizeElements.getOrCreate(vp);
            console.log('ColorDef.white');
            console.log(ColorDef.white);
            provider.overrideElements(elements, vp, ColorDef.white, FeatureOverrideType.ColorOnly, false)
            // provider.hideElements(elements, vp);
            await vp.zoomToElements(elements, { ...viewChangeOpts, ...zoomToOpts });
        }
    };

    public static zoomToAndHideElementsAnd = async (elements: string[], options: ZoomOptions) => {
        const viewChangeOpts: ViewChangeOptions = {
            animateFrustumChange: options.animateEnable,
        };

        const zoomToOpts: ZoomToOptions = {};
        const vp = IModelApp.viewManager.selectedView;

        // Set the view to point at a volume containing the list of elements
        if (vp) {
            const provider = EmphasizeElements.getOrCreate(vp);
            console.log('ColorDef.white');
            console.log(ColorDef.white);
            provider.overrideElements(elements, vp, ColorDef.white, FeatureOverrideType.ColorOnly, false)
            provider.hideElements(elements, vp);
            await vp.zoomToElements(elements, { ...viewChangeOpts, ...zoomToOpts });
        }
    };

    public static hideElementsFromView = async (elements: string[], options: ZoomOptions) => {
        const viewChangeOpts: ViewChangeOptions = {
            animateFrustumChange: options.animateEnable,
        };

        const zoomToOpts: ZoomToOptions = {};
        const vp = IModelApp.viewManager.selectedView;

        // Set the view to point at a volume containing the list of elements
        if (vp) {
            const provider = EmphasizeElements.getOrCreate(vp);
            console.log('ColorDef.white');
            console.log(ColorDef.white);
            vp.zoomToElements(elements, { ...viewChangeOpts, ...zoomToOpts });
            // provider.overrideElements(elements, vp, ColorDef.white, FeatureOverrideType.ColorOnly, false)
            await provider.hideElements(elements, vp);
        }
    };


    public static clearOverrideElements = async(elements: string[]) => {

        console.log("inside clearOverrideElements");
        console.log('elements');
        console.log(elements);

        const vp = IModelApp.viewManager.selectedView;
        if(vp) {
            const provider = EmphasizeElements.getOrCreate(vp);
            provider.clearOverriddenElements(vp, elements)
            // provider.clearHiddenElements(vp);
        }
    }
    public static clearOverrideAndHiddenElements = async(elements: string[]) => {

        console.log("inside clearOverrideAndHiddenElements");
        console.log('elements');
        console.log(elements);

        const vp = IModelApp.viewManager.selectedView;
        if(vp) {
            const provider = EmphasizeElements.getOrCreate(vp);
            provider.clearOverriddenElements(vp, elements)
            provider.clearHiddenElements(vp);
        }
    }
}