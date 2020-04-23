
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
         Cb     
         Cm
         shipVolume = (Lwl * Bwl * T *Cb )
        if(!Cm || Cm <= 0){
            Cm = 1.006 -0.0056*(Cb**3.56)// MidShip section coefficient using  Kerlen (1970)
             
        }else{
            Cm 
        }
        Cp = shipVolume/(Cm * Bwl * T * Lwl)  // Prismatic coefficient 
        Cwp  =  Cb/(0.471 + 0.55*Cb)     // waterline plane area coefficient using " Parson (2003)"
        Cf = 0.075/(Math.log10(Rn)-2)**2 
       
        // Sa = Lwl*(2*T+Bwl)*Math.sqrt(Cm)*(0.453 + 0.4425*Cb - 0.2862*Cm - 0.00346*(Bwl/T) + 0.3696*Cwp) + 2.38*(ABT/Cb) // Surface weted area 
        this.c23 = (0.453 + 0.4425*Cb - 0.2862*Cm - 0.00346*(Bwl/T) + 0.3696*Cwp)
        Sa = Lwl*(2*T+Bwl)*Math.sqrt(Cm)* (0.615989*this.c23 + 0.111439*Cm**3 +0.000571111*stern + 
        0.245357*(this.c23/Cm)) + 3.45538*AT + (ABT/Cb)*(1.4660538 + 0.5839497/Cm) // Surface weted area 

        console.log(Sa)

     }

    this.hull = function(){

         Lwl; // Lenght on waterLine
        AT     //Immersed of the transverse sectional area of the transomat AP zero speed 
        hB      //
        ABT     // transverse section area of teh bulb at the position where the still water surface intersect the stern
        Lpp   // Lenght between perpendicular 
        LOA // Overall lenght 
        Bwl  // Breath of waterLine
        Fn = shipSpeed/(g*Lwl)**0.5 // froude number
        Rn = (shipSpeed*Lwl)/viscosity
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

    }
}

function resistance(){


    this.formFactor = function(){
        this.LR =Lwl*(1-Cp+0.06*Cp*lcb)/(4*Cp-1)

    //     }
      if(T/Lwl > 0.05){
            this.c12 = (T/Lwl)**0.2228446
        }
        else if(T/Lwl > 0.02 && T/Lwl <= 0.05 ){
            this.c12 = 48.20*((T/Lwl)-0.02)**2.078+0.479948
        }
        else if(T/Lwl < 0.02 ){
            this.c12 = 0.479948
        }

        this.c14 = 1 + 0.011*stern

        //formFactor = this.c13*(0.93+this.c12*(Bwl/this.LR)**0.92497*(0.95-Cp)**-0.521448*(1+Cp+0.022*lcb)**0.6906)        
         formFactor = 0.93+0.487118*this.c14*(Bwl/Lwl)**1.06806*(T/Lwl)**0.46106*(Lwl/this.LR)**0.121563*(Lwl**3/shipVolume)**0.36486*(1-Cp)**-0.604247
        formFactor = (formFactor.toFixed(3))*1
         console.log("rform",formFactor)
         console.log("stern", stern)
       
    
    }
    this.appendageResistance = function(){
        K2
        dt
        Sapp
      if(thruster){
        //if thruster are fitted in the vessels, they are put into consideration 
        
        this.Ctbo = 0.003
        Rbt = Math.PI*density*shipSpeed**2*dt**2*this.Ctbo
        Rbt= Rbt/1000
        Rbt = (Rbt.toFixed(3))*1
        console.log("Rbt",Rbt)
    }else(
        Rbt = 0
    )
    console.log("Rbt",Rbt)
   
     Rapp= (0.5*density*Cf*Sapp*shipSpeed**2*K2) //+ Rbt
      
     Rapp = Rapp/1000
     Rapp = (Rapp.toFixed(3))*1

     console.log("Rapp",Rapp)
    }

    this.correlationResistance = function(){
        if(!bulbous){
            // if no bulbus c2 = 1
            this.c2 = 1
        }else{
            
            this.c3 = (0.56*(ABT)**1.5)/(Bwl*T*(0.31*Math.sqrt(ABT)+Tf-hB))
            this.c2 = Math.exp((-1.89)*Math.sqrt(this.c3))  // accounting for the reduction of wave due to bulbous 
        }

       if(Tf/Lwl <=0.04){
           this.c4 = Tf/Lwl
       }else if(Tf/Lwl > 0.04){

           this.c4 = 0.04
       }
       Ca = 0.006*(Lwl + 100)**-0.16-0.00205 + 0.003*Math.sqrt(Lwl/7.5)*Cb**4 * this.c2*(0.04 -this.c4)
       if(roughness === true){
           this.ks = 0.00015
           this.Ca = (0.105*this.ks**(1/3)-0.005579)/Lwl**(1/3)
       }else{
           this.Ca = 0
       }
        RA =   0.5*density*shipSpeed**2*Sa*(Ca+this.Ca)
        RA =  RA/1000
        RA = (RA.toFixed(3))*1
        console.log("ca",Ca)
    }

    this.PressureResistance = function(){
        //Additional pressure resistance due to immerse transom
        this.Fnt = shipSpeed/Math.sqrt(2*g*AT/(Bwl + Bwl * Cwp))
        if(this.Fnt <5){
            this.c6 = 0.2*(1-0.2*this.Fnt)

        }else if(this.Fnt >= 5){
            this.c6 = 0
        }
        
        Rtr = 0.5*density*shipSpeed**2*AT*this.c6
        Rtr = Rtr/1000
        Rtr= (Rtr.toFixed(3))*1
        console.log("Rtr",Rtr)


    }

    this.bulbousResistance = function(){
        // this.Pb = 0.56*Math.sqrt(ABT/(Tf-1.5*hB))
         // this.Fni = shipSpeed/Math.sqrt(g*(Tf-hB-0.25*Math.sqrt(ABT))+0.15*shipSpeed**2)

        this.hf = Cp*Cm*(Bwl*T/Lwl)*(136-316*Fn)*Fn**3
        if(this.hf < -0.01*Lwl){
            this.hf = -0.01*Lwl
        }
        this.hw = iE*shipSpeed**2/400
        if(this.hw > 0.01*Lwl){
            this.hw = 0.01*Lwl
        }

        this.Pb = 0.56*Math.sqrt(ABT)/(Tf-1.5*hB+this.hf)
        
        this.Fni = shipSpeed/Math.sqrt(g*(Tf-hB-0.25*Math.sqrt(ABT))+this.hf+this.hw)


        // Rb =0.11*Math.exp((-13)*this.Pb**-2)*this.Fni**3*ABT**1.5*g*density/(1+this.Fni**2)
        Rb = 0.11*density*g*(Math.sqrt(ABT))**3*((this.Fni**3)/(1+this.Fni**2))*Math.exp(-3.0*this.Pb**-2)
        Rb = Rb/1000
        Rb = (Rb.toFixed(3))*1
    }

    this.AirResistace = function(){
        this.Cda = 0.8
        RAA = 0.5*density_air * shipSpeed*this.Cda*Av
         RAA = RAA/1000
    }
    
    this.waveResistance = function(){
      
        // this.lcb = 0.0101*Lwl
        this.LR =Lwl*(1-Cp+0.06*Cp*lcb)/(4*Cp-1)
        this.d = -0.9
         iE = 1+89*Math.exp((-1*(Lwl/Bwl)**0.80856)*(1-Cwp)**0.30484*(1-Cp-0.0225*(lcb))**0.6367*(this.LR/Bwl)**0.34574*((100*shipVolume)/Lwl**3)**0.16302) // (original equation)  //halfe angle entrance of teh waterline 
         if(Bwl/Lwl < 0.11){
            this.c7 = 0.229577*(Bwl/Lwl)**0.33333
        }
         else if(Bwl/Lwl >= 0.11 && Bwl/Lwl < 0.25  ){
             this.c7 = (Bwl/Lwl)
             
         }
         else if(Bwl/Lwl >= 0.25){
             this.c7 = 0.5- 0.0625*(Bwl/Lwl)
            }
            
        this.c1 = 2223105*this.c7**3.78613*(T/Bwl)**1.07961*(90-iE)**-1.37565
       
        if(bulbous===false){
            // if no bulbus c2 = 1
            this.c2 = 1
            
        }else{
            
            this.c3 = (0.56*(ABT)**1.5)/(Bwl*T*(0.31*Math.sqrt(ABT)+Tf-hB))
            this.c2 = Math.exp((-1.89)*Math.sqrt(this.c3))  // accounting for the reduction of wave due to bulbous 
        }
        if(Tf/Lwl <= 0.04){
            this.c4 = Tf/Lwl
        }
        else if(Tf/Lwl > 0.4){
            this.c4 = 0.04
        }
        
        this.c5 = 1-0.8*AT/(Bwl*T*Cm)
        // this.c6

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

        Rw_A = this.c1*this.c2*this.c5*density*shipVolume*g*Math.exp(this.m1*Fn**this.d+this.m2*Math.cos(this.phi* Fn**-2))
        Rw_A = Rw_A/1000
        Rw_A = (Rw_A.toFixed(3))*1
        console.log("rwa",Rw_A/1000)
    }

     this.RwHighSped = function(){
         this.d = -0.9
        
         this.c14 = 1 + 0.011*stern
         this.lcb
         this.LR = Lwl*(1-Cp + 0.06*Cp*this.lcb/(4*Cp-1))

        this.onePlusk1 = 0.93+0.487118*this.c14*(Bwl/Lwl)**1.06806*(T/Lwl)**0.46106*(Lwl/this.LR)**0.121563*(Lwl**3/shipVolume)**0.36486*(1-Cp)**-0.604247 
        this.c17 = 6919.3*Cm**-1.3346*(shipVolume/Lwl**3)**2.00977*(Lwl/Bwl-2)**1.40692
        this.m3 = -7.2035*(Bwl/Lwl)**0.326869*(T/Bwl)**0.605375
        this.c5 = 1-0.8*AT/(Bwl*T*Cm)
        
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
        if(Lwl/Bwl < 12){
            this.phi = 1.446 * Cp - 0.03*(Lwl/Bwl)

        }else{
            this.phi = 1.446 * Cp - 0.036
        }

        if(!bulbous){
            // if no bulbus c2 = 1
            this.c2 = 1
        }else{
            this.c3 = (0.56*(ABT)**1.5)/(Bwl*T*(0.31*Math.sqrt(ABT)+Tf-hB))
            console.log("new c",this.c3)
            this.c2 = Math.exp((-1.89)*Math.sqrt(this.c3))  // accounting for the reduction of wave due to bulbous 
        }
        Rw_B = this.c17*this.c2*this.c5*shipVolume*density*g*Math.exp(this.m3*Fn**this.d+this.m4*Math.cos(this.phi*Fn**-2))
        Rw_B = (Rw_B.toFixed(3))*1
        console.log("",Rw_B)
     }

    this.frictionalResistance = function(){
        // this.density = 
         Rf = (density*Cf*shipSpeed**2*Sa)/2
         Rf = Rf/1000
         Rf = (Rf.toFixed(3))*1
         console.log("Rf",Rf)

    }
    this.finalWaveResistance = function(){

        if(Fn < 0.4){
            calResistnace.waveResistance()

            Rw = Rw_A
        }
        else if(Fn >= 0.4){
            calResistnace.RwHighSped()
            RW =  Rw_A+(10*Fn-4)* (Rw_B-Rw_A)/1.5
        
        }
    }
    this.additionalResistance = function (){
        // Wave  resistance 
        this.Lbw = 0.95*Bwl  // confirm this 

        Rwave =  (1/6)*density_air*g*H**2*Bwl*Math.sqrt(Bwl/this.Lbw)
        Rwave = ((Rwave/1000).toFixed(2))*1

        // Fouling resistance 
        Rfoul = 10*RT_calm 
        Rfoul = ((Rfoul/1000).toFixed(2))*1
        
    }

    this.totalResistance = function(){
        shipHull.hull()
       shipHull.coefficient()
       calResistnace.appendageResistance()
       calResistnace.PressureResistance()
       calResistnace.bulbousResistance()
       calResistnace.AirResistace()

       calResistnace.frictionalResistance()
       calResistnace.correlationResistance()
       calResistnace.formFactor()
       calResistnace.finalWaveResistance()
      //Rbt is the resistance due to thrusters opening

        // RT = Rf*formFactor+Rapp+Rw+Rb+RA+Rtr+Rbt
         RT_calm = Rf*formFactor+Rapp+Rw+RA+Rtr+Rbt+Rb + RAA
         RT_calm = (RT_calm.toFixed(3))*1
         calResistnace.additionalResistance()
           //Total resistnace 
        RT = RT_calm +  Rfoul + Rwave
        calResistnace.seaMargine()
    }
    this.seaMargine = function(){

        SM = (RT*shipSpeed/RT_calm*shipSpeed)-1
        
    }
}

function propellerProperties (){
    this.Thrust =function(){
        //cth = thrust loading cofficient
        this.Cpi = 1.45*Cp - 0.315-0.0225*lcb
        if(Lwl/Bwl < 5.2){
            this.c10 = 0.25-0.003328402/(Bwl*Lwl - 0.134615385)
        }
        else if(Lwl/Bwl >= 5.2){
            this.c10 = Bwl/Lwl
        }
        if(screw ==="singleScrew"){
           TFactor = (0.25*(Bwl/Lwl)**0.28956*(Math.sqrt(T*Bwl)/D)**0.2624)/(1-Cp+0.0225*lcb)**0.01762 + 0.0015*stern
        }
        if(screw ==="TwinScrew"){
            TFactor = 0.325*Cb-0.1885*D/Math.sqrt(Bwl*T)
        }
        // TFactor = 0.01979*Lwl/(Bwl-Bwl*this.Cpi)+1.0585*this.c10-0.00524-0.1418*D**2/(Bwl*T) + 0.0015*stern
        thrust = RT/(1-TFactor)
        thrust = thrust.toFixed(3)
        TFactor = TFactor.toFixed(3)
    }

    this.wake = function(){
      
        // Cv = (formFactor*this.Rf+ this.Rapp + this.RA)/0.5*density*shipSpeed**2*(Sa+Sapp)
        Cv = formFactor*Cf+Ca
        
        // Single screw ship
        if(Bwl/TA < 5){
            this.c8 = (Bwl*Sa)/(Lwl*D*TA)
        }
        else if(Bwl/TA >= 5){
            this.c8 = Sa*(7*Bwl/TA-25)/(Lwl*D*(Bwl/TA - 3))
        }
        if(this.c8 < 28){
            this.c9 = this.c8
        }
        else if(this.c8 >= 28){
           this.c9= 32-16/(this.c8-24)
        }

        if(TA/D < 2){
         this.c11 = TA/D

        }
        else if(TA/D >= 2){
            this.c11 = 0.0833333*(TA/D)**3+1.33333

        }

        if(Cp <= 0.7){
            this.c19 = (0.12997/(0.95-Cb))-((0.11056)/(0.95-Cp))
        }
        else if(Cp > 0.7){
            this.c19 = 0.18567/(1.3571-Cm)-0.71276 + 0.38648*Cp
        }
        this.c20 = 1 + 0.015*stern

        this.Cpi = 1.45*Cp - 0.315-0.0225*lcb
        Cv
        
        // W = (Cv*Lwl*this.c9/TA)*((0.0661875)+(1.21756*this.c11*(Cv/(1-this.Cpi))))+0.24558*Math.sqrt(Bwl/(Lwl*(1-this.Cpi)))-(0.09726/(0.95-Cp))+(0.11434/(0.95-Cb))+0.75*stern*Cv+0.002*stern
        if(screw ==="singleScrew"){
             W = this.c9*this.c20*Cv*(Lwl/TA)*(0.050776 + 0.93405*(this.c11*Cv/(1-this.Cpi))) + 0.27915*this.c20*Math.sqrt(Bwl/(Lwl*(1-this.Cpi))) + this.c19*this.c20
             NR = 0.9922 - 0.05908*AeAo + 0.07424*(Cp - 0.0225*lcb)       
        }
        else if(screw ==="TwinScrew"){
           W = 0.3095*Cb + 10*Cv*Cb - 0.23*D/Math.sqrt(Bwl*T)
           NR =  0.9737 +0.111*(Cp - 0.0225*lcb) - 0.06325*PD
        }
        Va = shipSpeed*(1-W)
        Va = Va.toFixed(2)
        Cth = thrust/(density*Va**2*D**2*(Math.PI/8))
        W = W.toFixed(3)
        Cth = Cth.toFixed(3)
        NR = NR.toFixed(3)
    }

    this.KTandKQ = function(){ 
        this.Co7r = 2.073*AeAo *D/Z
        this.Rno = (this.Co7r*Math.sqrt(Va**2 + (0.75*Math.PI*n*D)**2))/viscosity
        if(n && this.Rno > 2*10**6){
 
        KT = 0.000353485 - 0.00333758*AeAo*J**2-0.00478125*AeAo*PD*J +0.000257792*(Math.log(this.Rno)-0.301)**2*AeAo*J**2+0.0000643192*(Math.log(this.Rno)-0.301)*PD**6*J**2
        - 0.0000110636*(Math.log(this.Rno)-0.301)**2*PD**6*J**2- 0.0000276305**(Math.log(this.Rno)-0.301)**2*Z*AeAo*J**2+0.0000954*(Math.log(this.Rno)-0.301)*Z*AeAo*PD*J+0.0000032049*(Math.log(this.Rno)-0.301)*Z**2*AeAo*PD**3*J
        
        KQ = -0.000591412+0.00696898*PD-0.0000666654*Z*PD**6+0.0160818*AeAo**2-0.000938091*(Math.log(this.Rno)-0.301)*PD-0.00059593*(Math.log(this.Rno)-0.301)*PD**2+0.0000782099*(Math.log(this.Rno)-0.301)**2*PD**2
        +0.0000052199*(Math.log(this.Rno)-0.301)*Z*AeAo*J**2-0.00000088528*(Math.log(this.Rno)-0.301)**2*Z*AeAo*PD*J+0.0000230171*(Math.log(this.Rno)-0.301)*Z*PD**6-0.00000184341*(Math.log(this.Rno)-0.301)**2*Z*PD**6-0.00400252*(Math.log(this.Rno)-0.301)*AeAo**2
        +0.000220915*(Math.log(this.Rno)-0.301)**2*AeAo**2
        }
        else{
        
            KT = 0.00880496*J**0*PD**0*AeAo**0*Z**0-0.204554*J**1*PD**0*AeAo**0*Z**0 + 0.166351*J**0*PD**1*AeAo**0*Z**0 + 0.158114*J**0*PD**2*AeAo**0*Z**0 - 0.147581*J**2*PD**0*AeAo**1*Z**0 - 0.481497*J**1*PD**1*AeAo**1*Z**0 +
             0.415437*J**0*PD**2*AeAo**1*Z**0 + 0.0144043*J**0*PD**0*AeAo**0*Z**1 - 0.0530054*J**2*PD**0*AeAo**0*Z**1 + 0.0143481*J**0*PD**1*AeAo**0*Z**1 + 0.0606826*J**1*PD**1*AeAo**0*Z**1 - 0.0125894*J**0*PD**0*AeAo**1*Z**1 +
             0.0109689*J**1*PD**0*AeAo**1*Z**1 - 0.133698*J**0*PD**3*AeAo**0*Z**0 + 0.00638407*J**0*PD**6*AeAo**0*Z**0 - 0.00132718*J**2*PD**6*AeAo**0*Z**0 + 0.168496*J**3*PD**0*AeAo**1*Z**0 - 0.0507214*J**0*PD**0*AeAo**2*Z**0 +
             0.0854559*J**2*PD**0*AeAo**2*Z**0 - 0.0504475*J**3*PD**0*AeAo**2*Z**0 + 0.010465*J**1*PD**6*AeAo**2*Z**0 - 0.00648272*J**2*PD**6*AeAo**2*Z**0 - 0.00841728*J**0*PD**3*AeAo**0*Z**1 + 0.0168424*J**1*PD**3*AeAo**0*Z**1 -
             0.00102296*J**3*PD**3*AeAo**0*Z**1 - 0.0317791*J**0*PD**3*AeAo**1*Z**1 + 0.018604*J**1*PD**0*AeAo**2*Z**1  - 0.00410798*J**0*PD**2*AeAo**2*Z**1 - 0.000606848*J**0*PD**0*AeAo**0*Z**2 - 0.0049819*J**1*PD**0*AeAo**0*Z**2 +
             0.0025983*J**2*PD**0*AeAo**0*Z**2 - 0.000560528*J**3*PD**0*AeAo**0*Z**2 - 0.00163652*J**1*PD**2*AeAo**0*Z**2 - 0.000328787*J**1*PD**6*AeAo**0*Z**2 + 0.000116502*J**2*PD**6*AeAo**0*Z**2 + 0.000690904*J**0*PD**0*AeAo**1*Z**2 + 
             0.00421749*J**0*PD**3*AeAo**1*Z**2 + 0.0000565229*J**3*PD**6*AeAo**1*Z**2 - 0.00146564*J**0*PD**3*AeAo**2*Z**2

             KQ = 0.00379368*J**0*PD**0*AeAo**0*Z**0 + 0.00886523*J**2*PD**0*AeAo**0*Z**0 - 0.032241*J**1*PD**1*AeAo**0*Z**0 - 0.00344778*J**0*PD**2*AeAo**0*Z**0 - 0.0408811*J**0*PD**1*AeAo**1*Z**0 - 0.108009*J**1*PD**1*AeAo**1*Z**0 -
             0.0885381*J**2*PD**1*AeAo**1*Z**0 + 0.188561*J**0*PD**2*AeAo**1*Z**0 - 0.00370871*J**1*PD**0*AeAo**0*Z**1 + 0.00513696*J**0*PD**1*AeAo**0*Z**1 + 0.0209449*J**1*PD**1*AeAo**0*Z**1 + 0.00474319*J**2*PD**1*AeAo**0*Z**1 -
             0.00723408*J**2*PD**0*AeAo**1*Z**1 + 0.00438388*J**1*PD**1*AeAo**1*Z**1 - 0.0269403*J**0*PD**2*AeAo**1*Z**1 + 0.0558082*J**3*PD**0*AeAo**1*Z**0 + 0.0161886*J**0*PD**3*AeAo**1*Z**0 + 0.00318086*J**1*PD**3*AeAo**1*Z**0 +
             0.015896*J**0*PD**0*AeAo**2*Z**0 + 0.0471729*J**1*PD**0*AeAo**2*Z**0 + 0.0196283*J**3*PD**0*AeAo**2*Z**0 - 0.0502782*J**0*PD**1*AeAo**2*Z**0 - 0.030055*J**3*PD**1*AeAo**2*Z**0 + 0.0417122*J**2*PD**2*AeAo**2*Z**0 -
             0.0397722*J**0*PD**3*AeAo**2*Z**0 - 0.00350024*J**0*PD**6*AeAo**2*Z**0 - 0.0106854*J**3*PD**0*AeAo**0*Z**1  + 0.00110903*J**3*PD**3*AeAo**0*Z**1 - 0.000313912*J**0*PD**6*AeAo**0*Z**1 + 0.0035985*J**3*PD**0*AeAo**1*Z**1 -
             0.00142121*J**0*PD**6*AeAo**1*Z**1 - 0.00383637*J**1*PD**0*AeAo**2*Z**1 + 0.0126803*J**0*PD**2*AeAo**2*Z**1 - 0.00318278*J**2*PD**3*AeAo**2*Z**1 + 0.00334268*J**0*PD**6*AeAo**2*Z**2 - 0.00183491*J**1*PD**1*AeAo**0*Z**2 + 

             0.000112451*J**3*PD**2*AeAo**0*Z**2 - 0.0000297228*J**3*PD**6*AeAo**0*Z**2 + 0.000269551*J**1*PD**0*AeAo**1*Z**2 + 0.00083265*J**2*PD**0*AeAo**1*Z**2 + 0.00155334*J**0*PD**2*AeAo**1*Z**2 + 0.000302683*J**0*PD**6*AeAo**1*Z**2 -
             0.0001843*J**0*PD**0*AeAo**2*Z**2 - 0.000425399*J**0*PD**3*AeAo**2*Z**2 + 0.0000869243*J**3*PD**3*AeAo**2*Z**2 - 0.0004659*J**0*PD**6*AeAo**2*Z**2 + 0.0000554194*J**1*PD**6*AeAo**2*Z**2
        }

        NH = (1- TFactor)/(1-W) // Hull efficiency 
         No = (KT*J)/(KQ*2*3.14)
       
        NB = No * NR
        NT = 0.97  // (Assumed value
        NH = NH.toFixed(3)
        No = No.toFixed(3)
        KT = KT.toFixed(3)
        KQ = KQ.toFixed(3)
    }
 
   this.power = function(){

       Pe = RT*shipSpeed // effective power
       Pt  = RT*shipSpeed*((1-W)/(1-TFactor))
       Pd = Pt/NB   //deliver power to the propeller 
       ND = Pe/Pd
       Ps = Pd/NT
       Pe = Pe.toFixed(2)
       Pt = Pt.toFixed(2)
       Pd = Pd.toFixed(2)
    //    No = Pt/Pd
    //    No = No.toFixed(2)
       
   }
    
}

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
let shipHull = new ship()
let calResistnace = new resistance()
let EngineCal = new engineAnalysis()
 let propeller = new propellerProperties()

console.log(propeller)

