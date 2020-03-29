
function engineAnalysis (){

this.torque = function  (Strokes,speedRPM,mean_Presure,cylinderBore,cylinderNumber,pistonStroke){
    
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

    // this.power = ((this.Torque*1000*2*3.143*this.speedRPM)/60)/1000
    // load = this.power
    console.log("mean", this.mean_p)
    torque = (this.Torque).toFixed(1)
    torque = parseFloat(torque)
    console.log("Piston ",this.pistonStroke)
    console.log("speedt",this.speedRPM)
    console.log("cranshit",this.cranshaftRev)
    console.log("",this.engineStroke)
    console.log("torque",this.Torque)
    console.log("power",this.power)
    
   
},

//NOTE: SFOC is use of the baseline for teh engine is not provided my supplier  
 this.SFOC = function(load, enginePower, SFOC,supplier) {
    this.supplier = supplier
    this.load = load
    this.enginePower = enginePower
    this.EL = this.load/this.enginePower
    this.sfocBase = SFOC // used as the baseline for the engine if not provided 
    // this.sfocRelative = 0.4613*this.EL *this.EL-0.7168*this.EL + 1.28;
    this.sfocBase = 170;
    console.log("new sfoc base", this.sfocBase)
    engine_loadPercent = parseFloat((this.EL*100).toFixed(1))
    // this.sfocRelative = 0.4613*this.EL *this.EL-0.7168*this.EL + 1.28;
   

    if (this.supplier === "wartsila") {
    //   this.sfocRelative = 0.4613*this.EL *this.EL-0.7168*this.EL + 1.28;
    this.sfocRelative = 0.455*this.EL *this.EL-0.71*this.EL + 1.28; // general
       console.log(this.sfocRelative)
      this.SFOC_main = (this.sfocRelative*this.sfocBase).toFixed(1)
      sfoc_cal = parseFloat(this.SFOC_main);
    } 
    else if (this.supplier === "Cat") {
        this.sfocRelative = 0.7024*this.EL *this.EL-0.97728*this.EL + 1.35;
        sfoc_cal = this.SFOC_main;
    } 
    else if (this.supplier === "MAN") {
        this.sfocRelative = 0.2933*this.EL *this.EL-0.432*this.EL + 1.1565;
        sfoc_cal = this.SFOC_main;
    } 
    // this.SFOC_main = this.sfocBase*this.sfocRelative;
    // sfoc_cal = this.SFOC_main;
    console.log(sfoc_cal)
    
}


}


function ship(){

    this.hull = function(v){
        // this.T = T;  // Draght 
        // this.Ta = Ta  //
        // this.Tf = Tf  //
        // this.Lwl = Lwl; // Lenght on waterLine
        // this.Lpp = Lpp   // Lenght between perpendicular 
        // this.LoA = LoA  // Overall lenght 
        // this.BwL = BwL // Breath of waterLine
        // this.Am = Am // midship section area 
        this.T =4 ;  // Draght 
        this.Ta = Ta  //
        this.Tf = Tf  //
        this.Lwl = Lwl; // Lenght on waterLine
        this.Cwp        // waterplane area coefficient 
        this.Cm  // 
        this.Cp
        this.AT     //Immersed of the transverse sectional area of the transomat AP zero speed 
        this.hB      //
        this.ABT     // transverse section area of teh bulb at the position where the still water surface intersect the stern
        
        this.Lpp = Lpp   // Lenght between perpendicular 
        this.LoA = LoA  // Overall lenght 
        this.BwL = BwL // Breath of waterLine
        this.Am = Am // midship section area 
        this.weight  // weight of the vessel.
        this.viscosity
        this.shipSpeed = v
        if(!T){
            this.T = 0.5*(this.Tf + this.Ta)
        }
        this.Sa =1.025*((this,volume/this.T)+1.7*this.Lpp*this.T) // Surface weted area 
        this.volume 
        this.Rn = (this.shipSpeed*this.Lwl)/this.viscosity
        this.Cf = (0.075)/(math.log(this.Rn-2)**2)

        

    }

    
}

function resistance(){
    this.airResistance = function(){

    }
    
    this.waveResistance = function(){
        
        this.lcb = 0.5*Lwl
        // this.iE = 1+89*Math.exp(-(Lwl/B)**0.80856*(1-Cwp)**0.30484*(1-Cp-0.0225*lcb)**0.6367*(this-LR/B)**0.34574*((100*volume)/Lwl**3)**0.16302)    //halfe angle entrance of teh waterline 
        this.c1 = 2223105*this.c7**3.78613*(T/B)**1.07961*(90-this.iE)**-1.37565
        this.c2 = Math.exp(-1.89*Math.sqrt(this.c3))  // accounting for the reduction of wave due to bulbous 
        this.c3 = (0.56*ABT)**1.5/(B*T(0.31*Math.sqrt(ABT)+Tf-hB))
        if(Tf/Lwl <= 0.04){
            this.c4 = Tf/Lwl
        }
        else if(Tf/Lwl > 0.4){
            this.c4 = 0.04
        }
        
        this.c5 = (1-0.8*AT)/(B*T*Cm)
        this.c6
        this.m1 = ((0.0140407*Lwl)/T)-((1.75254*volume**(1/3))/Lwl)-((4.79323*BwL)/Lwl)-this.c16
        this.m2 = c15*Cp**2*Math.exp(0.1*Fn**-2)
        this.onePlusk1 = this.c13*(0.93+this.c12*(B/this.LR)**0.92497*(0.95-Cp)**-0.521448*(1+Cp+0.022*this.lcb)**0.6906)
        if(B/L < 0.11){
        this.c7 = 0.229577*(B/Lwl)**0.33333
        }
        else if(B/L >= 0.11 && B/L < 0.25  ){
            this.c7 = (B/Lwl)
         }
         else if(B/L >= 0.25){
            this.c7 = 0.5- 0.0625*(B/Lwl)
            }
        
        this.c8 = 
        this.c9 = this.c8
        this.c12
        if(stern === "Normal"){
            this.stern = 0
            this.c13 = 1+0.003*this.stern
        }
       else if(stern === "U and Hogner"){
            this.stern = 10
            this.c13 = 1+0.003*this.stern
        }
        else if(stern === "v"){
            this.stern = -10
            this.c13 = 1+0.003*this.stern
        }
        
        
        if(T/Lwl > 0.05){
            this.c12 = (T/Lwl)**0.2228446
        }
        else if(T/Lwl > 0.02 && T/Lwl <= 0.05 ){
            this.c12 = 48.20*((T/Lwl)-0.02)**2.078+0.479948
        }
        else if(T/Lwl < 0.02 ){
            this.c12 = 0.479948
        }

        if(Lwl**3/volume < 512){
            this.c15 = -1.69385
        }
        else if (Lwl**3/volume > 1727){
            this.c15 = 0.0
        }
        else if (Lwl**3/volume >= 512 &&  Lwl**3/volume <= 1727){

            this.c15 =  -1.69385 + ((Lwl/volume**(1/3)-8.0)/2.36)
        }

        if(Cp <= 0.80){
            this.c16 = 8.07981 *Cp -13.8673*Cp**2 + 6.984388*Cp**3
        }
        else if(Cp > 0.80){
            this.c16 = 1.73014 - 0.7067 *Cp 
        }


        
    
    }
    this.frictionalResistance = function(Cf, Sa, shipSpeed,){
        // this.density = 
        this.Rf = (this.density*Cf*shipSpeed**2*Sa)/2

        
    
    }
    
    this.residualResistance = function(){
    
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

