import { Id64String } from "@itwin/core-bentley";
import { Decorator, IModelApp, IModelConnection, ScreenViewport, Viewport } from "@itwin/core-frontend";
import { Cone, Point3d, PolyfaceBuilder, StrokeOptions } from "@itwin/core-geometry";
import { MountElementDecorator } from "./MountElementDecorator";
import { ColorDef } from "@itwin/core-common";


export class MountElementDecorationApi {

    public decorator: MountElementDecorator;
    private startPoint: Point3d;
    private endPoint: Point3d;
    constructor(boxLow: any, boxHigh: any) {
        this.decorator = new MountElementDecorator();
        this.startPoint = Point3d.fromJSON(boxLow);
        this.endPoint = Point3d.fromJSON(boxHigh);
    }

    public createMountElement = async () => {
        console.log("inside createMountElement")

        // console.log('this.startPoint');
        // console.log(this.startPoint);
        // console.log('this.endPoint');
        // console.log(this.endPoint);
        // this.decorator.clearGeometry();
        const options = StrokeOptions.createForCurves();
        options.needParams = false;
        options.needNormals = true;
        const builder = PolyfaceBuilder.create(options);
        // const cone = Cone.createAxisPoints(Point3d.create(0, 0, 0), Point3d.create(0, 0, 10), 4, 4, true);
        const cone = Cone.createAxisPoints(this.startPoint, this.endPoint, 0.2, 0.2, true);
        if (cone)
            builder.addCone(cone);

        console.log(this.decorator);

        const polyface = builder.claimPolyface(false);
        this.decorator.setColor(ColorDef.red);
        this.decorator.addGeometry(polyface);
        // this.decorator.drawBase();
        IModelApp.viewManager.addDecorator(this.decorator);

        return this;
    }

    public updateMountElement = async(boxLow: any, boxHigh: any) => {
        console.log("inside updateMountElement method");
        console.log(this.decorator);
        this.startPoint = Point3d.fromJSON(boxLow);
        this.endPoint = Point3d.fromJSON(boxHigh);
        console.log('this.startPoint');
        console.log(this.startPoint);
        console.log('this.endPoint');
        console.log(this.endPoint);
        // this.decorator.clearGeometry();
        IModelApp.viewManager.dropDecorator(this.decorator);
        this.decorator = new MountElementDecorator();
        return this.createMountElement();
        
    }

}