class SlingShot{
    constructor(bodyA, pointB){
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.04,
            length: 10
        }
        this.pointB = pointB;
        this.sling = Constraint.create(options);
        World.add(world, this.sling);

        
    }

    attach(body) {
        this.sling.bodyA  = body;
    }

    isHexagonAttached() {
        if(this.sling.bodyA == null) {
            return false;
        } else {
            return true;
        }
    }

    display(){
       if(this.sling.bodyA !== null) {
        var pointA = this.sling.bodyA.position;
        var pointB = this.pointB;
        strokeWeight(2);
        stroke(255);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
       }
    }

    fly() {
        // console.log("sqkpk")
        this.sling.bodyA = null;
        
    }
    
}