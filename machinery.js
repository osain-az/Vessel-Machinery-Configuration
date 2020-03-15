
function engineAnalysis (){

this.torque = function  (Strokes,speedRPM,mean_Presure,cylinderBore,cylinderNumber,pistonStroke){
    // this.mean_p = mean_P,
    // this.cylinderBore = cylinderBore,
    // this.pistonStroke = pistonStroke,
    // this.speed = speed,
    // this.pistonSpeed = pistonSpeed
    
    this.mean_p = mean_Presure;// bar 
    this.cylinderBore = cylinderBore*0.001;//m
    this.pistonStroke = pistonStroke *0.001;//m
    this.speedRPM = speedRPM;
    this.engineStroke = Strokes;

    if (this.engineStroke === "4 Stroke"){
        this.cranshaftRev = 2
    }
    else if((this.engineStroke === "2 Stroke")) {
        this.cranshaftRev = 1
    }

    
    // this.pistonSpeed = 
    this.cylinderNumber = cylinderNumber,
    this.area = (3.1413*this.cylinderBore*this.cylinderBore)/4
    this.volume = this.area*this.pistonStroke*this.cylinderNumber
    this.force = this.area*this.mean_p*100000;

    this.Torque = ((this.mean_p*100000*this.volume)/(2*3.143*this.cranshaftRev))/1000

    this.power = ((this.Torque*2*3.143*this.speedRPM)/60)/1000
    load = this.power
    console.log("mean", this.mean_p)
    torque = (this.Torque).toFixed(1)
    console.log("Piston ",this.pistonStroke)
    console.log("speedt",this.speedRPM)
    console.log("cranshit",this.cranshaftRev)
    console.log("",this.engineStroke)
    console.log("torque",this.Torque)
   
},

//NOTE: SFOC is use of the baseline for teh engine is not provided my supplier  
 this.SFOC = function(load, enginePower, SFOC,supplier) {
    this.supplier = supplier
    this.EL = load/enginePower
    this.sfocBase = SFOC // used as the baseline for the engine if not provided 
    this.sfocRelative = 0.4613*this.EL *this.EL-0.7168*this.EL + 1.28;
    engine_loadPercent

    if (this.supplier === "wartsila") {
      this.sfocRelative = 0.4613*this.EL *this.EL-0.7168*this.EL + 1.28;
        
    } 
    else if (this.supplier === "Cat") {
        this.sfocRelative = 0.7024*this.EL *this.EL-0.97728*this.EL + 1.35;
        
    } 
    else if (this.supplier === "MAN") {
        this.sfocRelative = 0.2933*this.EL *this.EL-0.432*this.EL + 1.1565;
        
    } 
    this.SFOC_main = this.sfocBase*this.sfocRelative;
    
}

}

 
 let EngineCal = new engineAnalysis()


// let sfoc = new SFOC
// sfoc

let engineData ={
    wartsila2:{
        supplier: "wartsila",
        engint_type: "Wärtsilä 46F",
        Strokes: "4 Stroke",
        speed_type: "Medium-Speed",
        IMO_compliant: " Tier II ",
        model: "14V46F",
        fuel_type: "MDO or HFO",
        LHV: "42.7 MJ/kg",
        SFOC: "176 g/kWh",
        pistonStroke : "580 mm",
        cylinderBore: "460 mm",
        mean_Presure : "24.9 bar ",
        cylinders: 8,
        cylinder_output: "1200 kW/cyl",
        power: "16800 kW",
        Engine_speed:" 600 RPM",
        weight: "216 tonnes",
        length: "11729 mm",
        width: "4678 mm",
        heigh: "6063 mm",
      },
      wartsila3:{
        supplier: "wartsila",
        engint_type: "Wärtsilä 32",
        Strokes: "4 Stroke",
        speed_type: "Medium-Speed",
        IMO_compliant: " Tier II ",
        model: "12V32",
        fuel_type: "MDO or HFO",
        LHV: "",
        SFOC: "178,8 g/kWh",
        pistonStroke : "400 mm",
        cylinderBore: "320 mm",
        mean_Presure : "28.9 bar ",
        cylinders: 12,
        cylinder_output: "580 kW/cyl",
        power: "6960 kW",
        Engine_speed:" 750 RPM",
        weight: "216 tonnes",
        length: "6875 mm",
        width: "2900 mm",
        heigh: "3940 mm",
      },
}

let wartsila32 = engineData.wartsila2
let wartsila46 = engineData.wartsila3

