declare var jsts: any;

// This class checks whether a google map polygon intersects itself
export class MapIntersections {

    gMaps2JTS(boundaries) {
        var coordinates = [];
        for (var i = 0; i < boundaries.getLength(); i++) {
            coordinates.push(new jsts.geom.Coordinate(
                boundaries.getAt(i).lat(), boundaries.getAt(i).lng()));
        }
        coordinates.push(coordinates[0]);
        return coordinates;
    };

    findSelfIntersection(googlePolygonPath) {
        var coordinates = this.gMaps2JTS(googlePolygonPath);
        var geometryFactory = new jsts.geom.GeometryFactory();
        var shell = geometryFactory.createLinearRing(coordinates);
        var jstsPolygon = geometryFactory.createPolygon(shell);

        // if the geometry is aleady a simple linear ring, do not
        // try to find self intersection points.
        var validator = new jsts.operation.IsSimpleOp(jstsPolygon);
        if (validator.isSimpleLinearGeometry(jstsPolygon)) {
            return;
        }

        var res = [];
        var graph = new jsts.geomgraph.GeometryGraph(0, jstsPolygon);
        var cat = new jsts.operation.valid.ConsistentAreaTester(graph);
        var r = cat.isNodeConsistentArea();
        if (!r) {
            var pt = cat.getInvalidPoint();
            res.push([pt.x, pt.y]);
        }
        return res;
    };

    checkIntersection(polygon) {
        var intersects = this.findSelfIntersection(polygon.getPath());
        return (intersects && intersects.length) ? true : false;
    }

}