
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
    this.shipVolume = this.area*this.pistonStroke*this.cylinderNumber
    this.force = this.area*this.mean_p*100000;

    this.Torque = ((this.mean_p*100000*this.shipVolume)/(2*3.143*this.cranshaftRev))/1000

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
    console.log("testing g" , g)
    
   
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

    this.coefficient = function(){
        // All different coefficient and areas 
        
        console.log(Text)
         Am         // midship section area 
         Awl
        
         
         // Cld
         // Cwl  =  Awl/(Lwl * Bwl)     // waterline plane area coefficient 
        
         
        //  if(inputShipVolume){
        //      shipVolume = inputShipVolume
        //      Cb = inputShipVolume/(Lwl * Bwl * T)
        //  }else{
 
        //      if(Fn > 0.15 && Fn < 0.32){
        //          // using Jensen(1994) recommendation for modern ship
        //          Cb = -4.22 + 27.8 * Fn**0.5 - 39.1 * Fn + 46.6 * Fn**3
        //      }else{
        //          // Ayres formular
        //          this.c = 1.06
        //          Cb = this.c - 1.68*Fn
        //          console.log("cp Ayres", Cb)
                
        //      }
             shipVolume = (Lwl * Bwl * T *Cb )
             
        //  }
         if(Am){
             
            Cm = Am/(Bwl * T)
            Cp = shipVolume/(Am * Lwl)
        }else{
            
            Cm = 1.006 -0.0056*(Cb**3.56)// MidShip section coefficient using  Kerlen (1970)
            Cp = shipVolume/(Cm * Bwl * T * Lwl)  // Prismatic coefficient 
            console.log("Cp", Cp)
        }
        Cwp  =  Cb/(0.471 + 0.55*Cb)     // waterline plane area coefficient using " Parson (2003)"
 
     }

    this.hull = function(){
        Lwl = parseFloat(Lwl)

         Lwl; // Lenght on waterLine
        AT     //Immersed of the transverse sectional area of the transomat AP zero speed 
        hB      //
        ABT     // transverse section area of teh bulb at the position where the still water surface intersect the stern
        Lpp   // Lenght between perpendicular 
        LOA // Overall lenght 
        Bwl  // Breath of waterLine
        Fn = shipSpeed/(g*Lwl)**0.5 // froude number
        console.log("FN", Fn)
        console.log("speed", shipSpeed)
        // if(fn >= 0.14 && Fn <= 0.32){
            ////Schneekluth formular

        //     if(Fn > 0.30){
        //         this.FnNew = 0.3
        //         Cb = (0.14/this.FnNew)*(((Lpp/Bwl)+20)/26)
        //     }
        //   //The formulae are valid for 0.48 <= Cb <= 0.85 and 0.14 <=Fn <= 0.32
        //     Cb = (0.14/Fn)*(((Lpp/Bwl)+20)/26)
        // }

        if(!T){
            T = 0.5*(Tf + TA)
        }
        // this.Sa =1.025*((shipVolume/this.T)+1.7*this.Lpp*this.T) // Surface weted area 
        this.Sa = Lwl*(2*T+Bwl)*Math.sqrt(Cm)*(0.453 + 0.4425*Cb - 0.2862*Cm - 0.00346*(Bwl/T) + 0.3696*Cwp) + 2.38*(ABT/Cb) // Surface weted area 
        
        Rn = (this.shipSpeed*this.Lwl)/viscosity
        
        // Cf = (0.075)/(math.log(this.Rn-2)**2)

    }

    
}

function resistance(){

    this.airResistance = function(){

    }
    
    this.waveResistance = function(){
        Lwl = parseFloat(Lwl)
        Bwl = parseFloat(Bwl)
        T = parseFloat(T)
        TA = parseFloat(TA)
        Tf = parseFloat(Tf)
        this.LR =3.2*(Bwl * T /Cb)
        this.d = -0.9
        // this.lcb = 0.5*Lwl
         this.lcb = -0.75
        if(!iE){
            // iE = 1+89*Math.exp((-1*(Lwl/Bwl)**0.80856)*(1-Cwp)**0.30484*(1-Cp-0.0225*this.lcb)**0.6367*(this.LR/Bwl)**0.34574*((100*shipVolume)/Lwl**3)**0.16302)  (original equation)  //halfe angle entrance of teh waterline 

         console.log("ci",iE*1)
         this.test = (-1*(-1*(1-Cp-0.0225*this.lcb))**0.6367)

        }else{
            iE 
        }
        

         if(Bwl/Lwl < 0.11){
            this.c7 = 0.229577*(Bwl/Lwl)**0.33333
        }
         else if(Bwl/Lwl >= 0.11 && Bwl/Lwl < 0.25  ){
             this.c7 = (Bwl/Lwl)
             console.log("second", this.c7 )
             
         }
         else if(Bwl/Lwl >= 0.25){
             this.c7 = 0.5- 0.0625*(Bwl/Lwl)
             console.log("last", this.c7 )
            }
            
        this.c1 = 2223105*this.c7**3.78613*(T/Bwl)**1.07961*(90-iE)**-1.37565
       
        if(!bulbous){
            // if no bulbus c2 = 1
            this.c2 = 1
        }else{
            
            this.c3 = (0.56*(ABT)**1.5)/(Bwl*T*(0.31*Math.sqrt(ABT)+Tf-hB))
            console.log("new c",this.c3)
            this.c2 = Math.exp((-1.89)*Math.sqrt(this.c3))  // accounting for the reduction of wave due to bulbous 
        }
        
        if(Tf/Lwl <= 0.04){
            this.c4 = Tf/Lwl
        }
        else if(Tf/Lwl > 0.4){
            this.c4 = 0.04
        }
        
        this.c5 = 1-0.8*AT/(Bwl*T*Cm)
          console.log("at c5", AT, Bwl, T, Cm)
        // this.c6
        
        this.onePlusk1 = this.c13*(0.93+this.c12*(Bwl/this.LR)**0.92497*(0.95-Cp)**-0.521448*(1+Cp+0.022*this.lcb)**0.6906)
        // this.c8 = 
        // this.c9 = this.c8
        if(stern === "Normal"){
            this.stern = 0
            this.c13 = 1+0.003*this.stern
        }
       else if(stern === "U&Hogner"){
            this.stern = 10
            this.c13 = 1+0.003*stern
        }
        else if(stern === "V"){
            this.stern = -10
            this.c13 = 1+0.003*stern
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

        if(Lwl**3/shipVolume < 512){
            this.c15 = -1.69385
        }
        else if (Lwl**3/shipVolume > 1727){
            this.c15 = 0.0
        }
        else if (Lwl**3/shipVolume >= 512 &&  Lwl**3/shipVolume <= 1727){

            this.c15 =  -1.69385 + ((Lwl/shipVolume**(1/3)-8.0)/2.36)
        }

        if(Cp <= 0.80){
            this.c16 = 8.07981 *Cp -13.8673*Cp**2 + 6.984388*Cp**3
        }
        else if(Cp > 0.80){
            this.c16 = 1.73014 - 0.7067 *Cp 
        }
        this.c17 = 69193.2*this.Cm**-1.3346*this.shipVolume

        if(Fn < 0.4){
            this.m1 = ((0.0140407*Lwl)/T)-((1.75254*shipVolume**(1/3))/Lwl)-((4.79323*Bwl)/Lwl)-this.c16
        }else{}

        this.m2 = this.c15*Cp**2*Math.exp((-0.1)*Fn**-2)

        if(Lwl/Bwl < 12){
            this.phi = 1.446 * Cp - 0.03*(Lwl/Bwl)

        }else{
            this.phi = 1.446 * Cp - 0.036
        }

        Rw = this.c1*this.c2*this.c5*density*shipVolume*g*Math.exp(this.m1*Fn**this.d+this.m2*Math.cos(this.phi* Fn**-2))
        
        console.log("c2",this.c2)
        console.log("m2",this.m2)
        console.log("m1",this.m1)
        console.log("c1",this.c1)
        console.log("c5",this.c5)
        console.log("c7",this.c7)
        console.log("c3",this.c3)
        console.log("c16",this.c16)
        console.log("iE", iE)
        console.log("ABT", ABT)
        console.log("cp", Cp)
        console.log("cb", Cb)
        console.log("cm", Cm)
        console.log("cwp", Cwp)
        console.log("volume", shipVolume)
        console.log("phi", this.phi)
        console.log("fn", Fn)
        

        console.log("Resistance",Rw/1000000)
    }
     this.RwHighSped = function(){
         if(stern = "V"){
            this.stern
            this.c14 = 1 + 0.011*this.stern

         }
         else if(stern = "V"){
             this.stern
            this.c14 = 1 + 0.011*this.stern

         }
         else if(stern = "V"){
            this.stern
            this.c14 = 1 + 0.011*this.stern
         }
         this.lcb
         this.LR = Lwl*(1-Cp + 0.06*Cp*this.lcb/(4*Cp-1))

        this.onePlusk1 = 0.93+0.487118*this.c14*(Bwl/Lwl)**1.06806*(T/Lwl)**0.46106*(Lwl/this.LR)**0.121563*(Lwl**3/shipVolume)**0.36486*(1-Cp)**-0.604247 
        this.c17 = 6919.3*Cm**-1.3346*(shipVolume/Lwl**3)**2.00977*(Lwl/Bwl-2)**1.40692
        this.m3 = -7.2035*(Bwl/Lwl)**0.326869*(T/Bwl)**0.605375
        

        if(Lwl**3/shipVolume < 512){
            this.c15 = -1.69385
        }
        else if (Lwl**3/shipVolume > 1727){
            this.c15 = 0.0
        }
        else if (Lwl**3/shipVolume >= 512 &&  Lwl**3/shipVolume <= 1727){

            this.c15 =  -1.69385 + ((Lwl/shipVolume**(1/3)-8.0)/2.36)
        }

        this.m4 = this.c15*0.4*Math.exp((-1)*0.034*Fn**-3.29)
        if(hB > 0.6*Tf){
            hB = 0.6*Tf
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

const shipHull = new ship()

let calResistnace = new resistance()

console.log(calResistnace)

