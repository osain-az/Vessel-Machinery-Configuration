
    let data, data2, RPM, Power,enginetype,speedRPM, engineStrokes, meanPressure,cylinderBore,pistonStroke,sfoc_cal,sfoc_cal_aux,
    enginePower,engine_loadPercent, LHV,fuelType,ratedPower,ratedSfoc, rpm_min, rpm_max, torque,load,supplier,ratedSpeed,
    minLoad, minPower,T, TA, Tf, Bwl, Lwl, shipSpeed, shipSpeedKnots, rudderBehindSkeg, rudderBehindStern, bilgeKeel, dome, stabilizerFins, shafts,
    hullBossings, strutBossings, skeg, shaftBracket, TwinScrewBalaRudder, Fn, Rn, Cb, Cm, Cp, Cwp, g, shipVolume, Cf, density, hB, ABT, AT, stern,inputShipVolume,
    Am, Awl,Rw,bulbous, sternId, lcb,LCB,lcb_type, Lpp, LOA,iE,Rw_A, Rw_B, Rb, Rtr, RA, Rf, Rbt,Rapp, Sa,domeCheck,StaFins,shaftsCheck,sBossings,sBracket,bKeel,thruster,K2,dt,Sapp,
    formFactor,intervalResis,D,Z,J,AeAo,PD,W, KQ,KT,thrust,Ca,Pe,Pt,NH,NR, nShafts, No, NB,ND,NT,Cv,Cth,Va,TFactor,n, RAA,cross_section_area,roughness,screw, Rwave,H,Rfoul,RT_calm,SM,
    Ns,Pb,RPM_pro,SMCR,Ptotal,engine_torque,propel_speed,simulate,DP_time, habor_time,standby_time,aux_ratedSpeed,No_of_eng,No_of_genset,aux_load,main_inst_power,
    star_time,end_time,power_aval,transit_time, FC_total, FC,calm_simulate, aux_enginePower,aux_inst_power,create_type,sellected_genset,sellected_battery,sellected_engine,propulsion_syst,
    gen_supplier,FC_ton,FC_ton_aux, main_engine_power,aux_engineStrokes,aux_meanPressure,aux_cylinderBore,aux_cylinders,aux_pistonStroke,aux_ratedsfoc,main_enginePower,emission_comparison,
    LNG_emission,wind_speed,RAA_wind,Lw,DP_Va,Pe_calm,operation,Pt_calm,Pd_calm,Ps_calm,ND_calm, dynamic_load,wave_height_cal, wind_speed_cal,environment_type,
     eng_power, gen_pwer,bat_capacity,bat_SOC,bat_DOD,bat_volt,bat_C_rated,bat_C_rated_peak,simu_time_show, total_insta_power,show_propulsion, recent_chose_engine,online_engine,simulation_environment,S_APP_input, engine_test_type,power

  let c1,c2,c3s,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19,c20,c21,c22,c23,c24,Fnt, phi,m1,m2, m3, m4 ,LR, CP1, p_b , Fni//for  testing vaues 

  function engineAnalysis (){
    //methods for different diesel engine property
   this.torque = function  (Strokes,speedRPM,mean_Presure,cylinderBore,cylinderNumber,pistonStroke){
       this.mean_P = mean_Presure;// bar
       this.cylinderBore = cylinderBore*0.001;//m
       this.pistonStroke = pistonStroke *0.001;//m
       this.speed_RPM = speedRPM;
       this.engineStroke = Strokes;
       if (this.engineStroke === "4 Stroke"){
           this.cranshaftRev = 2;
       }
       else if (this.engineStroke === "2 Stroke") {
           this.cranshaftRev = 1
       }
       // this.pistonSpeed =
       this.cylinderNumber = cylinderNumber
       this.area = (3.1413*this.cylinderBore*this.cylinderBore)/4
       this.Volume = this.area*this.pistonStroke*this.cylinderNumber
       this.force = this.area*this.mean_p*100000;
     
       if(engine_test_type === "load"){
         this.power = power
         this.RPM = (this.power*60)/(this.mean_P*this.Volume*(this.cranshaftRev*100)) //kNm
         RPM = this.RPM
         RPM = RPM.toFixed(2)
         this.torque = (power*60)/this.RPM
         torque = this.torque
         torque = torque.toFixed(2)*1
         console.log( (this.power*100*this.cranshaftRev *60),(this.mean_P*this.Volume))
        
       }
   
       if(engine_test_type === "RPM"){
         RPM //is an input from the dashbaord
         this.power =  ((this.mean_p*this.Volume*RPM)/(100*this.cranshaftRev*60)) //KW
        // this.Torque = ((this.mean_p*100*this.Volume)/(2*3.143*this.cranshaftRev)) // kNm
         this.torque = ((this.power*60)/RPM)/1000 // kNm
         torque = this.torque
       }
       return this.torque
   }
   //NOTE: SFOC is use of the baseline for the engine since the supplier dont provided the engine baseline
    this.SFOC = function(load, enginePower, SFOC,supplier,type) {
       this.supplier = supplier
       this.load = load
       this.type = type // used to determine weather is auxilary engine or main engine
       this.enginePower = enginePower
       this.EL = this.load/this.enginePower
       this.sfocBase = 170 // used as the baseline for the engine if not provided
       // this.sfocRelative = 0.4613*this.EL *this.EL-0.7168*this.EL + 1.28;
       // this.sfocBase = 170;
       engine_loadPercent = parseFloat((this.EL*100).toFixed(1))
       // this.sfocRelative = 0.4613*this.EL *this.EL-0.7168*this.EL + 1.28;
       if (this.supplier === "wartsila") {
       //   this.sfocRelative = 0.4613*this.EL *this.EL-0.7168*this.EL + 1.28;
       this.sfocRelative = 0.455*this.EL *this.EL-0.71*this.EL + 1.28; // general
          console.log(this.sfocRelative)
         this.SFOC_main = (this.sfocRelative*this.sfocBase).toFixed(1)
         if(this.type === "auxilary"){
           sfoc_cal_aux = parseFloat(this.SFOC_main);
           this.sfoc_cal_aux = sfoc_cal_aux
           console.log(sfoc_cal_aux," test load")
           sfoc_display = sfoc_cal_aux
         }else{
           sfoc_cal = parseFloat(this.SFOC_main);
            this.sfoc_cal = sfoc_cal
            sfoc_display = sfoc_cal
            console.log(sfoc_cal_aux," test load main")
         } 
         console.log(sfoc_cal_aux," test load  general")
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
       return {
         sfoc_cal_aux,
         sfoc_cal 
       }
   }
   
   
   
   }
   

function ship(){
 // ship resistance  component estimation
    this.coefficient = function(){
        // All different coefficient and areas
         Cb // input
         Cm // input
         shipVolume = (Lwl * Bwl * T *Cb )
        if(!Cm || Cm <= 0)  Cm = 1.006 -0.0056*(Cb**3.56)// MidShip section coefficient using  Kerlen (1970)
        Cp = shipVolume/(Cm * Bwl * T * Lwl)  // Prismatic coefficient
        Cwp  =  Cb/(0.471 + 0.55*Cb)     // waterline plane area coefficient using " Parson (2003)"
        Cf = 0.075/(Math.log10(Rn)-2)**2

        // Sa = Lwl*(2*T+Bwl)*Math.sqrt(Cm)*(0.453 + 0.4425*Cb - 0.2862*Cm - 0.00346*(Bwl/T) + 0.3696*Cwp) + 2.38*(ABT/Cb) // Surface weted area
        this.c23 = (0.453 + 0.4425*Cb - 0.2862*Cm - 0.00346*(Bwl/T) + 0.3696*Cwp)
        Sa = Lwl*(2*T+Bwl)*Math.sqrt(Cm)* (0.615989*this.c23 + 0.111439*Cm**3 +0.000571111*stern +
        0.245357*(this.c23/Cm)) + 3.45538*AT + (ABT/Cb)*(1.4660538 + 0.5839497/Cm) // Surface weted area
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
        Rn = (shipSpeed*Lwl)/viscosity   //reynolds number
        // if(fn >= 0.14 && Fn <= 0.32){
            ////Schneekluth formular
        if(lcb_type ==="aft"){
        lcb  = -(LCB/Lwl)*100
        
        }
        else if(lcb_type ==="forward"){
            lcb  = (LCB/Lwl)*100
        }else {
          //  method by Harvald(1974)
          lcb = -(0.44*Fn-0.094)
        }
        lcb = 1.3067 ;// NOTE :this is used for one time test so delete it after this time 
        if(!T) T = 0.5*(Tf + TA)
        
        // this.Sa =1.025*((shipVolume/this.T)+1.7*this.Lpp*this.T) // Surface weted area
    }
}

function resistance(){
    this.formFactor = function(){
      lcb -0.75
        this.LR =Lwl*(1-Cp+0.06*Cp*(-0.75))/(4*Cp-1)
        LR
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
        c14 = this.c14
        //formFactor = this.c13*(0.93+this.c12*(Bwl/this.LR)**0.92497*(0.95-Cp)**-0.521448*(1+Cp+0.022*lcb)**0.6906)
         formFactor = 0.93+0.487118*this.c14*(Bwl/Lwl)**1.06806*(T/Lwl)**0.46106*(Lwl/this.LR)**0.121563*(Lwl**3/shipVolume)**0.36486*(1-Cp)**-0.604247
        formFactor = (formFactor.toFixed(3))*1
         console.log("formfact",formFactor)
         
     }
    this.appendageResistance = function(){
        K2 // caculated at the other file (index.html)
        dt // caculated at the other file (index.html)
        Sapp  // caculated at the other file (index.html)
        if(S_APP_input> 10){
          Sapp = S_APP_input
          K2 = 1.5
        }
      if(thruster){
        //if thruster are fitted in the vessels, they are put into consideration
        this.Ctbo = 0.003
        Rbt = Math.PI*density*shipSpeed**2*dt**2*this.Ctbo
        Rbt = ((Rbt.toFixed(2))*1)/1000
        console.log("Rbt",Rbt)
    }else(
        Rbt = 0
    )
     Rapp= (0.5*density*Cf*Sapp*shipSpeed**2*K2) //+ Rbt
     Rapp =((Rapp.toFixed(2))*1)/1000
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
           this.c4 = 0.04;
       }
       Ca = 0.006*(Lwl + 100)**-0.16-0.00205 + 0.003*Math.sqrt(Lwl/7.5)*Cb**4 * this.c2*(0.04 -this.c4)
       if(roughness === true){
           this.ks = 0.00015;
           this.Ca = (0.105*this.ks**(1/3)-0.005579)/Lwl**(1/3)
       }else{
           this.Ca = 0;
       }
        RA =   0.5*density*shipSpeed**2*Sa*(Ca+this.Ca)
        RA =  RA/1000
        RA = (RA.toFixed(2))*1
        c2 = this.c2
        c3s = this.c3
        c4 = this.c4
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
        Rtr= (Rtr.toFixed(2))*1
        console.log("Rtr",Rtr)
        console.log("Fnt",this.Fnt)
        c6 = this.c6
        Fnt= this.Fnt 
    }

    this.bulbousResistance = function(){
        // this.Pb = 0.56*Math.sqrt(ABT/(Tf-1.5*hB))
         // this.Fni = shipSpeed/Math.sqrt(g*(Tf-hB-0.25*Math.sqrt(ABT))+0.15*shipSpeed**2)
        this.hf = (Cp*Cm*Bwl*T/Lwl)*(136-316.3*Fn)*Fn**3
        if(this.hf < -0.01*Lwl){
            this.hf = -0.01*Lwl
        }
        this.hw = iE*shipSpeed**2/(400*9.81)
        if(this.hw > 0.01*Lwl){
            this.hw = 0.01*Lwl
        }
        this.Pb = 0.56*Math.sqrt(ABT)/(Tf-1.5*hB+this.hf)
       // this.Pb = 2.555
        this.Fni = shipSpeed/Math.sqrt(g*(Tf-hB-0.25*Math.sqrt(ABT))+this.hf+this.hw)

        // Rb =0.11*Math.exp((-13)*this.Pb**-2)*this.Fni**3*ABT**1.5*g*density/(1+this.Fni**2)
        Rb = (0.11*density*g*(Math.sqrt(ABT))**3)*((this.Fni**3)/(1+this.Fni**2))*Math.exp(-3.0*this.Pb**-2)
        Rb = Rb/1000
        Rb = (Rb.toFixed(3))*1
        console.log("Pb",this.Pb)
        console.log("Fni",this.Fni)
        p_b = this.Pb
        Fni = this.Fni
    }
    this.AirResistace = function(){
        this.Cda = 0.8
        RAA = 0.5*density_air * shipSpeed**2*this.Cda*cross_section_area
         RAA = RAA/1000
    }
    this.wind_resistance = function(){
      RAA_wind = (( 0.5*density_air * wind_speed**2*this.Cda*cross_section_area)/1000) - RAA
      RAA_wind = RAA_wind.toFixed(2)*1
      //AV
    }

    this.waveResistance = function(){
      //Wave making resistnace 
        // this.lcb = 0.0101*Lwl
        lcb -0.75
        this.LR =Lwl*((1-Cp)+0.06*Cp*(-0.75)/(4*Cp-1))
       // this.LR = 81
        shipVolume = 37500
        Cwp = 0.75
        LR = this.LR
        this.d = -0.9
         iE = 1+89*Math.exp((-1*(Lwl/Bwl)**0.80856)*(1-Cwp)**0.30484*(1-Cp-0.0225*(-0.75))**0.6367*(this.LR/Bwl)**0.34574*((100*shipVolume)/Lwl**3)**0.16302) // (original equation)  //halfe angle entrance of teh waterline
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
        this.c17 = 69193.2*this.Cm**-1.3346*shipVolume

        if(Fn < 0.4) this.m1 = ((0.0140407*Lwl)/T)-((1.75254*shipVolume**(1/3))/Lwl)-((4.79323*Bwl)/Lwl)-this.c16
        

        this.m2 = this.c15*Cp**2*Math.exp((-0.1)*Fn**-2)
        this.m4 = this.c15*0.4*Math.exp(-0.0034*Fn**-3.29)
        m4 = this.m4
        if(Lwl/Bwl < 12){
            this.phi = 1.446 * Cp - 0.03*(Lwl/Bwl)

        }else{
            this.phi = 1.446 * Cp - 0.036
        }

        Rw_A = this.c1*this.c2*this.c5*density*shipVolume*g*Math.exp(this.m1*Fn**this.d+this.m4*Math.cos(this.phi* Fn**-2))
        Rw_A = ((Rw_A.toFixed(2))*1)/1000
        console.log("rwa",Rw_A/1000)
        console.log("c15",this.c15)
        console.log("c16",this.c16)
        console.log("c17",this.c17)
        console.log("phi",this.phi)
        console.log("m1",this.m1)
        c5 = this.c5
        c7 = this.c7
        c1 = this.c1
        c2 = this.c2
        c4 = this.c4
        c3s = this.c3
        c15 = this.c15
        c17 = this.c17
        c16 = this.c16
        phi= this.phi
        m1 = this.m1
        m2 = this.m2
        m4 = this.m4
    }

     this.RwHighSped = function(){
         this.d = -0.9
         this.c14 = 1 + 0.011*stern
         this.LR = Lwl*(1-Cp + 0.06*Cp*lcb/(4*Cp-1))
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
            hB = 0.5*Tf
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
        console.log("m4",this.m4)
       
        c14 = this.c14
        c17 = this.c17
        c15 = this.c15
        m3 = this.m3
        m4 = this.m4
     }
    this.frictionalResistance = function(){
         Rf = (density*Cf*shipSpeed**2*Sa)/2
         Rf = Rf/1000
         Rf = (Rf.toFixed(2))*1
         console.log("Rf",Rf)
    }
    this.finalWaveResistance = function(){
       // resolving of wave for high froud number and low froud number
        if(Fn < 0.4){
            calResistnace.waveResistance()
            Rw = Rw_A
            Rw =Rw.toFixed(3)*1
        }
        else if(Fn >= 0.4){
            calResistnace.RwHighSped()
            Rw =  Rw_A+(10*Fn-4)* (Rw_B-Rw_A)/1.5
            Rw =Rw.toFixed(3)*1
        }
    }
    this.additionalResistance = function (){
        // Wave  resistance
        Lb //  Distance of the bow to 95% of maximum beam on the waterline [m]
        Rwave =  (1/6)*density*g* wave_height**2*Bwl*Math.sqrt(Bwl/Lb) //Note TODO: this formula sholdnt use this.lwl
        Rwave = ((Rwave/1000).toFixed(2))*1

        // Fouling resistance
        Rfoul = 10*RT_calm  //// TODO: Confirm this again
        Rfoul = ((Rfoul/1000).toFixed(2))*1
    }

    this.totalResistance = function(){
        shipHull.hull()
       shipHull.coefficient()
       calResistnace.appendageResistance()
       calResistnace.PressureResistance()
       calResistnace.bulbousResistance()
       calResistnace.AirResistace()
       calResistnace.wind_resistance()
       calResistnace.frictionalResistance()
       calResistnace.correlationResistance()
       calResistnace.formFactor()
       calResistnace.finalWaveResistance()
      //Rbt is the resistance due to thrusters opening

         RT_calm = Rf*formFactor+Rapp+Rw+RA+Rtr+Rbt+Rb + RAA
         RT_calm = (RT_calm.toFixed(2))*1
         calResistnace.additionalResistance()
           //Total resistnace
        RT = RT_calm // + Rwave+ RAA_wind // + Rfoul
        RT = RT.toFixed(2)*1
        // SM = ((RT*shipSpeed/RT_calm*shipSpeed)-1)
        // alert(SM)
        console.log("c1",c1)
        console.log("c2",c2)
        console.log("c3",c3s)
        console.log("c4",c4)
        console.log("c5",c5)
        console.log("c6",c6)
        console.log("c7",c7)
        console.log("c8",c8)
        console.log("c9",c9)
        console.log("c10",c10)
        console.log("c11",c11)
        console.log("c13",c12)
        console.log("c13",c13)
        console.log("c14",c14)
        console.log("c15",c15)
        console.log("c16",c16)
        console.log("c17",c17)
        console.log("c18",c18)
        console.log("c19",c19)
        console.log("c20",c20)
        console.log("m1",m1)
        console.log("m2",m2)
        console.log("m3",m3)
        console.log("m4",m4)
        console.log("phi",phi)
        console.log("iE",iE)
        console.log("LR",LR)
        console.log("CP",Cp)
        console.log("P_b",p_b)
        console.log("Fni",Fni)
       
    }
}

function fourier_propeller_analyis(){
  //using fourier method
  if(!beta) {
    Math.atan(va/(0.7*Math.PI*n*D))
  }
  CT_S = A_T0 + A_T1*Math.cos*beta + B_T1*Math.sin*beta 
  CQ_S = A_Q0 + A_Q1*Math.cos*beta + B_Q1*Math.sin*beta 

   Propeller_Thrust = CT_S*0.5*density(va**2 + beta**2)*(Math.PI/4)*D**2
   Propeller_torque = CQ_S*0.5*density(va**2 + beta**2)*(Math.PI/4)*D**3
}

function propellerProperties (){
    this.Thrust =function(){
        //cth = thrust loading cofficient
        lcb = -0.7
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
        thrust = thrust.toFixed(2)
        TFactor = TFactor.toFixed(2)
        console.log("cpi",this.cpi)
        console.log("c10",this.c10)
    }

    this.wake = function(){

        // Cv = (formFactor*this.Rf+ this.Rapp + this.RA)/0.5*density*shipSpeed**2*(Sa+Sapp)
        Cv = formFactor*Cf+Ca
        // Single screw ship
        lcb= -0.7
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

        //For Dp Operation
        this.DP_speed = 3*0.51 // Dp speed is assumed to be 3 knot according to the literatures (tranvser speed)
        DP_Va = this.DP_speed*(1-W)
        console.log("c8", this.c8)
        console.log("c9", this.c9)
        console.log("c20", this.c20)
        console.log("c11", this.c11)
        console.log("c19", this.c19)
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
          console.log(KT,"KT", KQ,"KQ")
        NH = (1- TFactor)/(1-W) // Hull efficiency
         No = (KT*J)/(KQ*2*3.14)

        NB = No * NR
        NT = 0.97  // (Assumed value
        NH = NH.toFixed(3)
        No = No.toFixed(3)
        KT = KT.toFixed(3)
        KQ = KQ.toFixed(3)
        propel_speed = (1-W)*shipSpeed/(D*J)
        propel_speed = (propel_speed.toFixed(2))*1

    }

   this.power = function(){
    
   // Power when the vessel is  extream condition 
        Pe = RT*shipSpeed // effective power
      
        Pt  = RT*shipSpeed*((1-W)/(1-TFactor))
        Pd = Pt/NB   //deliver power to the propeller
        ND = Pe/Pd
        Ps = Pd/NT
        Pb = ((Pd/Ns).toFixed(2))*1
        // engine_torgue = Pb_calm/(2*Math.PI*propel_speed)
        // propel_torque = Pd/(2*Math.PI*propel_speed)

        Pe_calm = (RT_calm*shipSpeed).toFixed(2)*1 // effective power
        Pt_calm  = (RT_calm*shipSpeed*((1-W)/(1-TFactor))).toFixed(2)*1 // thruster poer
        Pd_calm = (Pt_calm/NB).toFixed(2) //deliver power to the propeller
        ND_calm = Pe_calm/Pd_calm
        Ps_calm = (Pd_calm/NT).toFixed(2)*1
        Pb_calm = ((Pd_calm/Ns).toFixed(2))*1
        engine_torgue = Pb_calm/(2*Math.PI*propel_speed)
        propel_torque = Pd_calm/(2*Math.PI*propel_speed)
       speedRPM = (propel_speed *60).toFixed(1)*1//for low speed engine
       torque =   engine_torgue.toFixed(1)
   }

}
let track_dynalic = 1
  class environment_load {
    // update wave height and wind Speed, to have a dynamic laod
    constructor(){
      this.new_wave = 0; // store max input wave wave_height
      this.new_wind_speed = 0;  //  stored the max wind speed
    }
    set updat_wave(wave){
       this.new_wave = wave; // update the max wave possible  wave_height
     }
     set updat_wind(speed){
      this.new_wind_speed = speed; // update the max possible speed
    }
    update_dynamic_load (){
      //TODO: Check if the speed resistance need to be calculated 
      //generate new even  vironmnet wave and wind speed and recalculating the dynamic load
      this.wave_height_cal = Math.random()* (this.new_wave -1)+1; // new wave height but it will never exceed the max input y the user
      this.wind_speed_cal = Math.random()* (this.new_wind_speed -1)+1 ; // new wind speed but it will never exceed the max input y the user
      calResistnace.wind_resistance(); // calling wind resistance fcntion
      this.Rwave =  (1/6)*density*g*this.wave_height_cal**2*Bwl*Math.sqrt(Bwl/Lb); // calclation the wave resistance
      this.dynamic_thrust = (this.Rwave+RAA_wind)/(1-TFactor); 
      if(operation ==="DP"){
        this.dynamic_load  = ((2*Math.PI*this.DP_KQ*this.dynamic_thrust**(3/2))/(density**0.5*D*this.DP_KT))/1000;
        dynamic_load = this.dynamic_load;
      }else{
        this.Pe = (this.Rwave*shipSpeed)/1000
        this.Trusth_p = ((this.Rwave+RAA_wind)*shipSpeed*((1-W)/(1-TFactor)))
        this.dynamic_load = (this.Trusth_p/NB)/1000; 
        dynamic_load = this.dynamic_load; 
      } 
      this.track = dynamic_load
      if(this.track > track_dynalic){
        track_dynalic = dynamic_load  
      }
      return this.dynamic_load;
    }
    thrusters_details (){
      this.propeller_diam = D ;// diamter is assume as the input diameters
      this.DP_KT  = KT ;  // this is for DP , Va = 0
      this.PD_KQ  = KQ ;  // this is for DP , Va = 0
      this.KT = KT;  // this is for transit Va not zero 
      this.KQ  = KQ; // this is for transit Va not zero 
      this.Thrust_factor = TFactor;
      this.Dp_propel_speed_rad = DP_Va/(J*D);

      console.log(this.Dp_propel_speed," dp speed")
      console.log(DP_Va," Va")
      console.log(J, D ," J and D")
      this.DP_thruster =  (density*D**4*this.PD_KT*this.Dp_propel_speed_rad**2)
      this.DP_torque =  (density*D**5*this.PD_KQ*this.Dp_propel_speed_rad**2)

    //  this.Dp_propel_speed = Math.sqrt(this.DP_torque*(Math.PI)**2/(this.DP_KQ *density *D**5))
      // this.DP_break_power = this.Dp_propel_speed_rad*this.DP_torque;
       this.DP_break_power = (2*Math.PI*this.Dp_propel_speed_rad*this.DP_torque)/1000;

      console.log( this.DP_torque)
      console.log( this.DP_break_power," dp power")
         console.log( this.DP_break_power," dp power")
         console.log(this.PD_KT)
         console.log(this.PD_KT)
      DP_break_power = this.DP_power; 
      return this.DP_break_power
    };

   }
 
 const  engine_property = {
   // used to hold the result of the each engine online engine during simulation to analized each engine 
    load : 0,
    power: 0,
    sfoc : 0,
    FC : 0,
    Fuel_cost: 0,
    CO2  :0,
    id :"",
    stat_time : 0,
    running_time : "",
    status : "off_online",
    fuel_consmption : 0,
   }

  class PMS {
      constructor(engine_nums,engine_power,operation,Aux_load,bat_SOC, supplier,sfoc){
           this.engine_nums = engine_nums; // numbers of engine installed
           this.engine_power = engine_power; // each installed power
           this.Aux_load = aux_load;  // Hotel and auxilary load combine as one
           this.break_power = Pb_calm; // Break power during transi
           this.stand_by_engine = false;
           this.charging_activated = false;
           this.dynamic_load = 0;  // dynamic load in calm water
           this.fuel_SFOC_cal_1 = 0;
           this.fuel_consumption_final = 0;
           this.fuel_SFOC_cal_2 = 0;
           this.Fuel_cons_2 =0;
           this.supplier = supplier;
           this.waiting_off_engine = false
           this.sfoc = sfoc;        
           this.fuel_consumption = 0; 
           this.count = 0
           if(sellected_battery){
            this.battery_pack = new battery_system();
            this.charging_power = this.battery_pack.charging_power
            this.discharge_power = this.charging_power 
           }
           this.FC_without_battery = 0 
           
          //  this.standy_by_ready_time = 20000; // time for the stand by engine to be ready 
          //  this.engine_start_time = 10000; // it takes the engine 10 seconds to be connected and ready to be used
           this.operation = operation; // type of operation e.g transit, Harbor and DP operation
           if(operation ==="DP"){
             this.DP_break_power = environment.thrusters_details();    
             this.break_power = this.DP_break_power       
             console.log(this.DP_break_power)
             if(!this.DP_break_power){
              this.break_power = Pb_calm; // Break power during transi
             }
           }else{
            this.break_power = Pb_calm; // Break power during transi
           }
           this.combine_load = this.dynamic_load  + this.break_power +this.Aux_load;
           this.total_combine_load = this.combine_load;
           console.log(this.combine_load,"load combine")
         
           if(this.engine_nums > 5){
            // only 5 engines are allow to be installed at this stage
             alert( `maximum accepted numers of installed  generator set  is 4, but you installed ${this.engine_nums}`)
             //Stop the simulation from running since the PMS can only handle 4 genset TODO:
             return  
           }
           else if(this.engine_nums <2){
            // Minimum mber of engine allow to be installed is 2
            alert( `minimum accepted numers of installed  generator set  is 2, but you installed ${this.engine_nums}`)
             return
           }

            this.start_off_engine() 
      }

      start_off_engine(){
        //this for the intial starting of the engine
        this.combine_load = this.total_combine_load +this.dynamic_load
        this.waiting_connection= false;
        this.stand_by_engine = false;
   
        this.standy_by_ready_time = 0; 
        if(this.operation === "DP"){
          // when DP operation things change like Load
            if(sellected_battery && bat_SOC >5){
              // if battery pack is installed 
              this.battery_SOC = bat_SOC; 
              this.engine_normal_load = this.engine_power*0.8;  //normal operating load of teh engine 
             }else {
              this.engine_normal_load = this.engine_power*0.65;  //normal operating load of the engine when nor battery pack installed 
            }
        }else{
           
          if(sellected_battery && bat_SOC >5){
            // if battery pack is installed 
            this.battery_SOC = bat_SOC; 
            this.engine_normal_load = this.engine_power*0.8;  //normal operating load of teh engine 
           }else{
            this.engine_normal_load = this.engine_power*0.8;  //normal operating load of teh engine 

           }
        }

        // this.combine_load= this.combine_load.toFixed(0)*1
        // this.engine_normal_load = this.engine_normal_load.toFixed(0)*1
        this.required_engines  = this.combine_load/this.engine_normal_load ;// allow 80 % of load on engine during normal operation    
        this.last_engine_load = ((this.combine_load%this.engine_normal_load))  
        this.check_last_engine_load  =  this.last_engine_load/this.engine_power  //checking the load percentage on the last engine 
 
        if(this.check_last_engine_load < 0.3){
        while (this.check_last_engine_load < 0.3){
          // if the last engine one  has load less than 30%  of the engine power then  adjust the normal working load until the last engine reached a minimum of 30 %
          this.engine_normal_load = this.engine_normal_load-(this.engine_normal_load *0.01);  //normal operating load of teh engine 
          this.required_engines  = this.combine_load/this.engine_normal_load ;// allow 80 % of load on engine during normal operation
          this.last_engine_load = (this.combine_load%this.engine_normal_load)
          this.check_last_engine_load  =  this.last_engine_load/this.engine_power  //checking the load percentage on the last engine    
        }
        }
      
          this.update();  // this run when just starting simulation, turning on the required numbers of engine based on the calclated load
        
      }

       update(){  
      
      if(this.required_engines <= 1){
       this.required_engines= 1;
       this.engine_online_obj = { }
       this.engine_online_obj.one = Object.create(engine_property)
      }
      else if (this.required_engines >1 && this.required_engines<= 2){
       this.required_engines= 2;
       if(this.count <= 0){
       this.engine_online_obj = { }
       this.engine_online_obj.one = Object.create(engine_property)
       this.engine_online_obj.two = Object.create(engine_property)
       }
      }
      else if (this.required_engines >2 && this.required_engines<= 3){
        this.required_engines= 3;
        if(this.count <= 0){
      
       this.engine_online_obj = { }
       this.engine_online_obj.one = Object.create(engine_property)
       this.engine_online_obj.two = Object.create(engine_property)
       this.engine_online_obj.three = Object.create(engine_property)
        }
      }
      
      else if (this.required_engines >3 && this.required_engines <4){
       this.required_engines= 4;
       if(this.count <= 0){
       this.engine_online_obj = { }
       this.engine_online_obj.one = Object.create(engine_property)
       this.engine_online_obj.two = Object.create(engine_property)
       this.engine_online_obj.three = Object.create(engine_property)
       this.engine_online_obj.fourth = Object.create(engine_property)
       }
    }
      else if (this.required_engines >4){
        this.required_engines= 5;
        if(this.count <= 0){
        this.engine_online_obj = { }
        this.engine_online_obj.one = Object.create(engine_property)
        this.engine_online_obj.two = Object.create(engine_property)
        this.engine_online_obj.three = Object.create(engine_property)
        this.engine_online_obj.fourth = Object.create(engine_property)
        this.engine_online_obj.fifth = Object.create(engine_property)  
        }
      }
      // optimized the loads on engines for fuel efficiency after turning Onn the required engines 
     // this.optimized_engine_load() 
     if(this.count <= 0){
      console.log(this.engine_online_obj,"engine online")
      this.engine_data_backup = Object.assign(this.engine_online_obj); // create a backup of the online engine and monitor and  
     // Object.seal(this.engine_data_backup) ; // ensure that trned off engine data are not deleted 
     }else {
       this.turn_on_new_engine()
     }
    } 

    optimized_engine_load(step){
      //this is the proposed algrithym  for sharing load,
      this.fuel_SFOC_cal_2 = 0; // emtying the precivous calculated result 
     this.fuel_SFOC_cal_1 = 0; // emtying the precivous calculated result
     this.simulate_step =step; 
     this.fuel_consumption =0;
     if(Object.is(aux_load,this.Aux_load) === false || Object.is(this.break_power,Pb_calm) ===false ){
       if(operation === "DP"){
        this.total_combine_load = aux_load + this.break_power
       }else{
        this.total_combine_load = aux_load + Pb_calm
       }     
     }
     this.fuel_consumption_final =0;
     this.used_battery = false; 
     if(simulation_environment ==="wave_wind")  this.environment_loads = environment.update_dynamic_load();  // update dynamic laod   
     this.dynamic_load = this.environment_loads
     if(!this.dynamic_load ){
      this.dynamic_load  = 0
     }
     this.load_with_dynamics = this.dynamic_load + this.total_combine_load
     this.engine_optimzed = function(){
      this.length = Object.keys(this.engine_online_obj).length
      this.online_engine = this.length      
      
      let i = 1 ;
      if (this.stand_by_engine === true) this.engine_normal_load = this.engine_power*1.1 // allowing the engine to take load to the 
      
     Object.keys(this.engine_online_obj).forEach(key => {
         this.check_load = (this.combine_load-this.engine_normal_load)/this.engine_power
         if(this.length ===2){
           this.assigned_load = this.combine_load/2
         }
        else if(this.check_load < 0.3){
            this.assigned_load = this.combine_load/2
         }
       else{
           this.assigned_load = this.engine_normal_load
           this.combine_load  = this.combine_load - this.assigned_load 
         }        
        this.fuel_SFOC_2 =  EngineCal.SFOC(this.assigned_load,this.engine_power,this.sfoc,this.supplier,"auxilary")
        this.SFOC_cal_2 = this.fuel_SFOC_2.sfoc_cal_aux
        this.fuel_SFOC_cal_2 +=this.SFOC_cal_2
        this.fuel_consumption = this.assigned_load*(this.SFOC_cal_2/1000)*this.simulate_step;
        this.fuel_consumption = this.fuel_consumption/1000;
        if(this.used_battery ===false){
          this.fuel_result = fuel_Details (this.fuel_consumption);
          this.engine_online_obj[key]["load"] = this.assigned_load;
          this.engine_online_obj[key]["FC"] += this.fuel_consumption;
          this.engine_online_obj[key]["sfoc"] = this.SFOC_cal_2;
          this.engine_online_obj[key]["Fuel_cost"] += this.fuel_result.aux_cost
          this.engine_online_obj[key]["CO2"]  += this.fuel_result.aux_CO2 
          this.fuel_consumption_final += this.fuel_consumption*1000
          this.last_engine_load = this.assigned_load
        }else{
          //this capture the result of the Fuel consumption without the effect of the battery pack for comparison 
     
          this.FC_without_battery += this.fuel_consumption

        }
      
        console.log(this.assigned_load," assigned load")
        console.log(i)
     
        console.log(this.length)
       //  this.fuel_SFOC_cal_2 = this.fuel_SFOC_cal_2-100

        i++     
       });

       if(this.fuel_SFOC_cal_2 > this.fuel_SFOC_cal_1){
        // this.fuel_SFOC_cal_2 = 0
        // Object.keys(this.engine_online_obj).forEach(key => {
        //         this.fuel_consumption = this.load_on_each_eng*(this.SFOC/1000)*this.simulate_step;
        //         this.fuel_consumption = this.fuel_consumption/1000;
        //         this.fuel_result = fuel_Details (this.fuel_consumption);
        //         this.engine_online_obj[key]["load"] = this.load_on_each_eng;
        //         this.engine_online_obj[key]["FC"] += this.fuel_consumption;
        //         this.engine_online_obj[key]["sfoc"] = this.SFOC;
        //         this.engine_online_obj[key]["Fuel_cost"] += this.fuel_result.aux_cost
        //         this.engine_online_obj[key]["CO2"]  += this.fuel_result.aux_CO2

        //       this.fuel_consumption_final += this.fuel_consumption
        //       console.log(this.fuel_consumption, "fuel consumtion other ") 
        //       });
      }else{
        // this.fuel_SFOC_cal_1 = 0
      }
      
     }
      if(this.environment_loads){
        // if(operation ==="P"){

        // }
        
        if(sellected_battery && bat_SOC> 0){ 
          if(this.total_combine_load+this.dynamic_load> (this.combine_engines_power+this.discharge_power)){
            //checking if the battery rated power and online engine can take the load 
            this.discharge_power = this.discharge_battery(); // battery taking the dynamics based on the rated power of the battery pack
            this.used_battery = false; // used to capture the effect of the battery useage for analysis purposed 
            this.BlackOut_prevention() // reduce the load to be assigned to teh gen sets if necessary   
            this.engine_optimzed();
          }else{
     
           if(this.total_combine_load+dynamic_load-this.discharge_powepppr > this.combine_engines_power) {
              this.used_battery = true; // used to capture the effect of the battery useage for analysis purposed 
              this.combine_load = this.combine_engines_power // updating the load  due to the environment load 
              this.engine_optimzed(); // before en
              this.discharge_power = this.discharge_battery(); // battery taking the dynamics based on the rated power of the battery pack
              this.combine_load = this.total_combine_load + this.dynamic_load; // updating the load  due to the environment load 
              this.combine_load =  this.combine_load - this.discharge_power; // updating the load  due to the environment load 
              this.used_battery = false; // used to capture the effect of the battery useage for analysis purposed 
              this.engine_optimzed(); 
            } else {
              this.used_battery = true; // used to capture the effect of the battery useage for analysis purposed 
              this.combine_load = this.total_combine_load + this.dynamic_load; // updating the load  due to the environment load 
              this.engine_optimzed(); // before battery take the dynamic load
              this.discharge_power = this.discharge_battery(); // battery taking the dynamics based on the rated power of the battery pack
              this.combine_load = this.combine_load-this.discharge_power // update laod
              this.used_battery = false; // used to capture the effect of the battery useage for analysis purposed 
              this.engine_optimzed(); // after battery has taken the dynamic load
            }
          }
        
        }else{
          this.combine_load = this.dynamic_load + this.total_combine_load; //Nothing is taken by the battery pack 
          this.BlackOut_prevention() // reduce the load to be assigned to teh gen sets if necessary   
        this.used_battery = false; // used to capture the effect of the battery useage for analysis purposed 
        this.engine_optimzed();
        }
      // this.combine_load = this.total_combine_load + this.dynamic_load; // updating the load  due to the environment load 
      }else{
        this.combine_load = this.total_combine_load
        this.BlackOut_prevention() // reduce the load to be assigned to teh gen sets if necessary   
        this.used_battery = false; // used to capture the effect of the battery useage for analysis purposed 
        this.engine_optimzed();
      }
      if(this.combine_load < this.combine_engines_power*0.8 && this.charging_activated ===true){
        if(bat_SOC < bat_capacity*bat_DOD){
         if(this.charging_power +this.combine_load < this.combine_engines_power*0.8 ){
          this.used_battery = true; // used to ensure is running just the section of the battery in the next function
           this.engine_optimzed();
           this.battery_charge_power = this.charge_battery(); //return actuall charging power
           this.used_battery = false;
           this.combine_load = this.combine_load + this.battery_charge_power ;//
           this.engine_optimzed();
         }
     
        }        
      }
     
      // this.online_engine = this.required_engines; // numbers of engine online 
      // this.load_on_each_eng = this.combine_load/this.online_engine; // used to decide how optimized the load on the engine foe better fuel consmption 
      // this.fuel_SFOC_1 = EngineCal.SFOC(this.load_on_each_eng,this.engine_power,this.sfoc,this.supplier,"auxilary") //SFOC when laod is share equally on genset 
      // this.SFOC = this.fuel_SFOC_1.sfoc_cal_aux;
      // this.fuel_SFOC_cal_1 = (this.fuel_SFOC_1.sfoc_cal_aux)*this.online_engine
      // this.Fuel_cons_1 += this.load_on_each_eng*this.fuel_SFOC_cal_1*(500/1000*3600) 
  
        this.count++
        console.log(this.waiting_off_engine, "waiting_off_engine")
        console.log(this.stand_by_engine, "stand by engine ")
        console.log(this.standy_by_ready_time, "standby ready time")
        console.log(this.waiting_connection, "waiting connection")
        return this.fuel_consumption_final  // include the effect of the of the battery packs if available 
      
    }
    turn_on_new_engine(){
      // if(this.required_engines >2) {
      // this.required_engines =1 
      //  this.load_with_dynamics
      //   }
      //   else if(this.required_engines)
    
    if(this.required_engines > this.length){
      this.remain_engine = this.required_engines-this.length
     
        for (let index = 0; index < this.remain_engine; index++) {
         
        this.remain_engine
        if(this.length ===2) {
          this.engine_online_obj.three = Object.create(engine_property)
        }
        else if(this.length ===3){
          this.engine_online_obj.fourth = Object.create(engine_property)
        }
        else if(this.length ===4){
          this.engine_online_obj.fifth = Object.create(engine_property)
        }
        else if(this.length ===5){
          this.engine_online_obj.sixth = Object.create(engine_property)
        }
    
        }
       
        }
       
      }
      FLR(){
        this.engine_normal_load  // 80% when battery is install and without battery pack is 65%
        this.engine_load_limit = this.engine_power*1.1; // max load 110 % for 10 seconds   
        this.combine_engine_limit = this.engine_load_limit*this.online_engine
        if(this.combine_load > this.combine_engine_limit){
          this.limit_load = this.combine_engine_limit
          this.combine_load = this.limit_load
        }else{
          this.limit_load = this.combine_load
        }
        // this.limit_load = Math.min(this.combine_load,this.combine_engine_limit)
        // const testing  = this.limit_load;
      
           // TODO:
      }

      BlackOut_prevention(){
        this.online_engine = this.length
        this.engine_normal_load  // 80% when battery is installed but without battery pack is 65% of the engine capacity
        this.engine_load_limit = this.engine_power*1.1; // max load 110 % for 10 seconds 
        this.combine_engines_power = this.engine_power*this.online_engine
        this.FLR(); // fast load reducering algrithyms 
        if(this.limit_load > this.combine_engines_power*0.8 && this.limit_load < this.combine_engines_power*0.9 && this.stand_by_engine === false){
          // TODO: activate standby engine 
          //NOTE: TODO: A typical engine start time from starting, stand to connection of løaod is 45s
          this.stand_by_engine = true;
          setTimeout(() => {        
              this.standy_by_ready_time = 20000 // it take 20 seconds for the stand by engine to be ready       
          },20000 );

         }
         else if(this.stand_by_engine ===true && this.limit_load < this.combine_engines_power*0.7){
         this.off_standby_engine_time = 5*60*3600 // scaled down automatic turn of  stand by engine
          setTimeout(() => {
            if(this.limit_load <this.combine_engines_power*0.7){
              this.stand_by_engine = false; // turning off the standy engine 
            }
            },this.off_standby_engine_time );
         }
         else if(this.limit_load >= this.combine_engines_power*1.05 && this.waiting_connection ===false){
           //TODO: start new engine 
           if(this.standy_by_ready_time === 20000 && this.stand_by_engine === true){
            //typicall it takes 10 seconds to connection the genset and ready to take load after stand by 
            this.waiting_connection = true // used to ensure this section will one run once to keep track of the time 
            setTimeout(() => {  
              this.start_off_engine()
               this.waiting_off_engine = true;
             }, 10000);
           }
           if(this.stand_by_engine === false){
             // for any reason the stand by engine didnt activated in the above command, then it takes 30 seconds to active and get ready to connet to the grid             
             this.stand_by_engine =true
             setTimeout(() => {
              this.start_off_engine()
               this.waiting_off_engine = true;
             }, 30000);
           }
         }
         //TODO: Recheck the below code 
        // if(this.waiting_off_engine === true){
        //   if(sellected_battery && this.load_with_dynamics < this.combine_engines_power* 0.75){
        //     this.waiting_off_engine = false;
        //    setTimeout(() => {
        //     if(sellected_battery && this.load_with_dynamics < this.combine_engines_power* 0.75){
        //      this.start_off_engine()
        //     }else{
        //       this.waiting_off_engine = true;
        //     }
        //     }, 40000);
        //   }else if(!sellected_battery && this.load_with_dynamics < this.combine_engines_power* 0.65){
        //     setTimeout(() => {
        //       if(!sellected_battery && this.load_with_dynamics < this.combine_engines_power* 0.65){
        //        this.start_off_engine()
        //       }else{
        //         this.waiting_off_engine = true;
        //       }
        //       }, 40000);
        //   }
        //  }        
      } 
      blackOut_recovery(){
        // When partial blackout fully blackout due to break done of the engine, or an event of a single engine break down detected 
       this.FLR()
        if(this.stand_by_engine === true){
          // if engine was already on standy then it takes 10 seconds to come online 
          this.time  = 10000; 
        }else if(this.stand_by_engine === false){
           // if engine was not on standy then it takes 30 seconds to come online 
            this.time = 30000; 
            this.stand_by_engine = true;  // activate a stand_by engine 
        }
        setTimeout(() => {
          //take 30 seconds to
          this.start_off_engine()
        }, this.time);
      }
      charge_battery(){
        this.charging_properties = this.battery_pack.charge_battery();
        this.charging_status = this.charging_properties.charging_status
        this.chargin_power = this.charging_properties.charging_load;
        this.charging_step = this.charging_properties.charging_step;
        this.charging_time = this.charging_properties.charging_time;
        // this.total_charging_power = this.chargin_power*this.charging_step; //kWh
        return this.charging_power
        //TODO: confirm if is a good pratices to charging a battery pack during a DP operation 
      }
      discharge_battery(){
       this.discharging_propteries = this.battery_pack.discharge_battery(this.environment_loads)
       this.discharge_status =this.discharging_propteries.discharge_status;
       this.discharge_step = this.discharging_propteries.discharge_step
      this.discharging_power = this.discharging_propteries.discharge_power
       return this.discharging_propteries.discharge_power
      }
      Test_blackout(blackOut_type){
        this.blackOut_type = blackOut_type;
        if(this.blackOut_type ==="fully"){
          //means : activating test for all engines down
          Object.keys(this.engine_online_obj).forEach(key => {
            Object.keys(this.engine_online_obj[key] ).forEach(key=>{   
              if(key ==="load"){
                this.engine_online_obj[key] = 0;
              }
            })
            
        });

      }
      if(this.blackOut_type ==="partially"){
        // intiate black out on a single engine 

        this.engine_online_obj.one = 0;
      }
      }
      Monitor_system(){
        //TODO: this monitor the entire systems to ensure every thing is ok, if rise alarm or take action 
        this.combine_load
        Object.keys(this.engine_online_obj).forEach(key1 => {
          
          Object.keys(this.engine_online_obj[key1] ).forEach(key=>{   
            if(key ==="load"){
                //Checking the engine for blackOut
              if(this.engine_online_obj[key1][key] === 0){
                //if any engine has zero load and is suppose to be online then that engine is blackout
                this.blackUut = true;
              }else{
                this.blackOut = false;
              }
            }
          })
        
        });

        if(this.blackOut === true){
          delete this.engine_online_obj[key1]  // remove the blackout generator online
          this.blackOut_recovery() // initiate recovery 
        }
        
      }

}

  class battery_system{
    constructor(){
      this.c_rate =  bat_C_rated;
      this.status = "not used";
      this.capacity = bat_capacity;
      this.charging_power  = this.capacity*this.c_rate;
      this.scaled_charging_time = 2*60*1000; // conditioning the charging time to be complete on in 2 minutes, so result can be analysis faster 
      this.actual_charging_time = (60/this.c_rate)*60*1000; // the actual charging time in milliseconds 
      this.charging_step =  (this.actual_charging_time)/(this.scaled_charging_time/500);
      this.charging_step_hours =  this.charging_step/(3600*1000);
      this.discharge_step = this.charging_step_hours; 
      this.DOD =bat_DOD;
      this.charging_time = 0
      this.DOD = this.DOD/100;
     this.test = 0;
      this.discharging_time = 0; 
    }

   charge_battery (){
        // scale every thing down to complete every given charging in 2 minutes
        // the battery is condition to complete its charging in 2 minutes using it original rate C rate
        this.status = "Charging"
        if(bat_SOC < this.capacity*this.DOD){
          this.charging_check = this.charging_power * this.charging_step_hours
          if(this.charging_check+bat_SOC> this.capacity*this.DOD){
            //checking/preventing over charging of the battery pack
            this.charging_load = (this.capacity*this.DOD - bat_SOC)/this.charging_step_hours;// getting the remaining capacity to have 100% SOC and convering to required power
            this.charging_load = this.charging_load *this.charging_step_hours
          }else{
            this.charging_load  = this.charging_power * this.charging_step_hours
          }
          bat_SOC += this.charging_load
          this.charging_status =  bat_SOC /(this.capacity*this.DOD)*100;
          this.charging_time += this.charging_step_hours*60
        }else{
          this.charging_load = 0
          this.charging_status =  bat_SOC /(this.capacity*this.DOD)*100

        }
        this.test ++
        console.log(bat_SOC ,"SOC")
        console.log(this.charging_time  ,"Chargine time")
        console.log(this.charging_load  ,"charge load")
        console.log(this.charging_status ,"status")
          console.log(this.test ,"count")
          console.log(this.charging_step_hours,"step")
          console.log(this.charging_power,"charge power")
        
       return {
         charging_load : this.charging_load,
         charging_status: this.charging_status,
         charging_time : this.charging_time,
         charging_step : this.charging_step_hours

       }
    };
    discharge_battery (load){
      //conditioning the discharge to be complete in 2 minues of the simualation time.
      this.load = load; //dynamics load
      if(bat_SOC > 0 ){
        this.status = "discharging"
        if(this.load < this.disCharge_power){
          this.check_remain_bat = (this.load*this.discharge_step)

          if(this.check_remain_bat < bat_SOC){
          dynamic_load = dynamic_load- this.load; // update the dynamics load so it can be taken by other source 
          }else {
            
          this.load = bat_SOC/this.discharge_step; // recalculate the minimum accepted load of the bact if is less than the c rated
          dynamic_load = dynamic_load- this.load; // update the dynamics load so it can be taken by other source 
          }

        }else {
          dynamics_load = this.load-this.disCharge_power
          this.load = this.disCharge_power;
        }
        bat_SOC = bat_SOC-(this.load*(500/(360*1000))); //update the state of charge of the battery pack
        this.discharging_time += this.discharge_step;
      }
      this.charging_status = bat_SOC/(this.DOD*this.capacity)
      return{
         discharge_status: this.charging_status,
         discharge_load :this.load*this.discharge_step,
         discharge_power :this.load
      }
    };

  }

  function fuel_properties() {

      this.LNG = function(fuel_tonn,type) {
        this.fuel_tonn = fuel_tonn;
        this.type = type
        this.LHV= "48000 kJ/kg";
        this.price = "700 $/ton";
        this.density = "450 kg/m^3"
       this.Sox = 0;
       this.Cf = 2.750;
       this.Nox = 0.0140;
       this.PM = 0.00018;
       this.NMVOC = 0.003
       if(this.type ==="Auxiliary"){
        // Calculation for Auxiliary engine
      this.LNG_cost_Aux = parseFloat(this.price)*this.fuel_tonn
       this.LNG_NMVOC_Aux = this.NMVOC*this.fuel_tonn
      this.LNG_PM_Aux = this.PM*this.fuel_tonn
      this.LNG_Sox_Aux = this.Sox*this.fuel_tonn
      this.LNG_NOx_Aux = this.Nox*this.fuel_tonn
      this.LNG_CO2_Aux = this.Cf*this.fuel_tonn
      this.LNG_volume_Aux = this.fuel_tonn*1000/parseFloat(this.density)
      return {
        LNG_NMVOC_Aux : parseFloat(this.LNG_NMVOC_Aux.toFixed(2)) ,
        LNG_PM_Aux :parseFloat(this.LNG_PM_Aux.toFixed(2)),
        LNG_cost_Aux : parseFloat(this.LNG_cost_Aux.toFixed(2)) ,
        LNG_Sox_Aux : parseFloat(this.LNG_Sox_Aux.toFixed(2)),
        LNG_NOx_Aux :  parseFloat(this.LNG_NOx_Aux.toFixed(2)),
        LNG_CO2_Aux : parseFloat(this.LNG_CO2_Aux.toFixed(2)),
        LNG_volume_Aux : parseFloat(this.LNG_volume_Aux.toFixed(2))
      }
    }else{

      this.LNG_cost = parseFloat(this.price)*this.fuel_tonn
      this.LNG_NMVOC = this.NMVOC*this.fuel_tonn
      this.LNG_PM = this.PM*this.fuel_tonn
      this.LNG_Sox = this.Sox*this.fuel_tonn
      this.LNG_NOx = this.Nox*this.fuel_tonn
      this.LNG_CO2 = this.Cf*this.fuel_tonn
      this.LNG_volume = this.fuel_tonn*1000/parseFloat(this.density)
      return {
        LNG_NMVOC : parseFloat(this.LNG_NMVOC.toFixed(2)) ,
        LNG_PM : parseFloat(this.LNG_PM.toFixed(2)),
        LNG_cost : parseFloat(this.LNG_cost.toFixed(2)) ,
        LNG_Sox : parseFloat(this.LNG_Sox.toFixed(2)),
        LNG_NOx :  parseFloat(this.LNG_NOx.toFixed(2)),
        LNG_CO2 : parseFloat(this.LNG_CO2.toFixed(2)),
        LNG_volume : parseFloat(this.LNG_volume.toFixed(2))
      }
    }
      }
      this.MDO = function (fuel_tonn,type){
          // check to eliminate different calculation by using just one calculation
          //for both main engine and auxiliary engine TODO:

        this.fuel_tonn = fuel_tonn;
        this.type = type
        this.LHV ="42700 kJ/kg";
        this.price= "900 $/ton";
        this.density = "900 kg/m^3";
       this.Sox = 0;
       this.Cf = 3.205;
       this.Nox = 0.08725;
       this.PM = 0.00097;
       this.NMVOC = 0.00308
       if(this.type ==="Auxiliary"){
        // Calculation for Auxiliary engine
        console.log("FC aux", FC_ton_aux,this.fuel_tonn)
      this.MDO_cost_Aux = parseFloat(this.price)*this.fuel_tonn
       this.MDO_NMVOC_Aux = this.NMVOC*this.fuel_tonn
      this.MDO_PM_Aux = this.PM*this.fuel_tonn
      this.MDO_Sox_Aux = this.Sox*this.fuel_tonn
      this.MDO_NOx_Aux = this.Nox*this.fuel_tonn
      this.MDO_CO2_Aux = this.Cf*this.fuel_tonn
      this.MDO_volume_Aux = this.fuel_tonn*1000/parseFloat(this.density)
      return {
        MDO_NMVOC_Aux : parseFloat(this.MDO_NMVOC_Aux.toFixed(2)) ,
        MDO_PM_Aux :parseFloat(this.MDO_PM_Aux.toFixed(2)),
        MDO_cost_Aux : parseFloat(this.MDO_cost_Aux.toFixed(2)) ,
        MDO_Sox_Aux : parseFloat(this.MDO_Sox_Aux.toFixed(2)),
        MDO_NOx_Aux :  parseFloat(this.MDO_NOx_Aux.toFixed(2)),
        MDO_CO2_Aux : parseFloat(this.MDO_CO2_Aux.toFixed(2)),
        MDO_volume_Aux : parseFloat(this.MDO_volume_Aux.toFixed(2))
      }

    }
    else{
      this.MDO_cost = parseFloat(this.price)*this.fuel_tonn
      this.MDO_NMVOC = this.NMVOC*this.fuel_tonn
      this.MDO_PM = this.PM*this.fuel_tonn
      this.MDO_Sox = this.Sox*this.fuel_tonn
      this.MDO_NOx = this.Nox*this.fuel_tonn
      this.MDO_CO2 = this.Cf*this.fuel_tonn
      this.MDO_volume = this.fuel_tonn*1000/parseFloat(this.density)
      return {

        MDO_NMVOC : parseFloat(this.MDO_NMVOC.toFixed(2)) ,
        MDO_PM : parseFloat(this.MDO_PM.toFixed(2)),
        MDO_cost : parseFloat(this.MDO_cost.toFixed(2)) ,
        MDO_Sox : parseFloat(this.MDO_Sox.toFixed(2)),
        MDO_NOx :  parseFloat(this.MDO_NOx.toFixed(2)),
        MDO_CO2 : parseFloat(this.MDO_CO2.toFixed(2)),
        MDO_volume : parseFloat(this.MDO_volume.toFixed(2))
      }
    }


    }
    this.MGO = function (fuel_tonn,type){
        this.fuel_tonn = fuel_tonn;
        this.type = type
        this.LHV = "42700 kJ/kg";
        this.price = "500 $/ton";
        this.density = "844.8 kg/m^3"
       this.Sox = 0.010;
       this.Cf = 3.205;
       this.Nox = 0.0961;
       this.PM = 0.00097;
       this.NMVOC = 0.00308

      if(this.type ==="Auxiliary"){
        // Calculation for Auxiliary engine
      this.MGO_cost_Aux = parseFloat(this.price)*this.fuel_tonn
       this.MGO_NMVOC_Aux = this.NMVOC*this.fuel_tonn
      this.MGO_PM_Aux = this.PM*this.fuel_tonn
      this.MGO_Sox_Aux = this.Sox*this.fuel_tonn
      this.MGO_NOx_Aux = this.Nox*this.fuel_tonn
      this.MGO_CO2_Aux = this.Cf*this.fuel_tonn
      this.MGO_volume_Aux = this.fuel_tonn*1000/parseFloat(this.density)
      return {
        MGO_NMVOC_Aux : parseFloat(this.MGO_NMVOC_Aux.toFixed(2)) ,
        MGO_PM_Aux :parseFloat(this.MGO_PM_Aux.toFixed(2)),
        MGO_cost_Aux : parseFloat(this.MGO_cost_Aux.toFixed(2)) ,
        MGO_Sox_Aux : parseFloat(this.MGO_Sox_Aux.toFixed(2)),
        MGO_NOx_Aux :  parseFloat(this.MGO_NOx_Aux.toFixed(2)),
        MGO_CO2_Aux : parseFloat(this.MGO_CO2_Aux.toFixed(2)),
        MGO_volume_Aux : parseFloat(this.MGO_volume_Aux.toFixed(2))
      }
    }else{
      this.MGO_cost = parseFloat(this.price)*this.fuel_tonn
      this.MGO_NMVOC = this.NMVOC*this.fuel_tonn
      this.MGO_PM = this.PM*this.fuel_tonn
      this.MGO_Sox = this.Sox*this.fuel_tonn
      this.MGO_NOx = this.Nox*this.fuel_tonn
      this.MGO_CO2 = this.Cf*this.fuel_tonn
      this.MGO_volume = this.fuel_tonn*1000/parseFloat(this.density)
      return {
        MGO_NMVOC : parseFloat(this.MGO_NMVOC.toFixed(2)) ,
        MGO_PM : parseFloat(this.MGO_PM.toFixed(2)),
        MGO_cost : parseFloat(this.MGO_cost.toFixed(2)) ,
        MGO_Sox : parseFloat(this.MGO_Sox.toFixed(2)),
        MGO_NOx :  parseFloat(this.MGO_NOx.toFixed(2)),
        MGO_CO2 : parseFloat(this.MGO_CO2.toFixed(2)),
        MGO_volume : parseFloat(this.MGO_volume.toFixed(2))

      }
    }
    }
    this.HFO = function(fuel_tonn,type){
        this.fuel_tonn = fuel_tonn;
        this.type = type
        this.LHV = "40200 kJ/kg";
        this.price = "600 $/ton";
       this.density = "991 kg/m^3"
       this.Sox = 0.025;
       this.Cf = 3.114;
       this.Nox = 0.0903;
       this.PM = 0.00728;
      this. NMVOC = 0.00308

      if(this.type ==="Auxiliary"){
          // Calculation for Auxiliary engine
        this.HFO_cost_Aux = parseFloat(this.price)*this.fuel_tonn
         this.HFO_NMVOC_Aux = this.NMVOC*this.fuel_tonn
        this.HFO_PM_Aux = this.PM*this.fuel_tonn
        this.HFO_Sox_Aux = this.Sox*this.fuel_tonn
        this.HFO_NOx_Aux = this.Nox*this.fuel_tonn
        this.HFO_CO2_Aux = this.Cf*this.fuel_tonn
        this.HFO_volume_Aux = this.fuel_tonn*1000/parseFloat(this.density)
        return {
            HFO_NMVOC_Aux : parseFloat(this.HFO_NMVOC_Aux.toFixed(2)) ,
            HFO_PM_Aux :parseFloat(this.HFO_PM_Aux.toFixed(2)),
            HFO_cost_Aux : parseFloat(this.HFO_cost_Aux.toFixed(2)) ,
            HFO_Sox_Aux : parseFloat(this.HFO_Sox_Aux.toFixed(2)),
            HFO_NOx_Aux :  parseFloat(this.HFO_NOx_Aux.toFixed(2)),
            HFO_CO2_Aux : parseFloat(this.HFO_CO2_Aux.toFixed(2)),
            HFO_volume_Aux : parseFloat(this.HFO_volume_Aux.toFixed(2))
          }
      }else{
        this.HFO_cost = parseFloat(this.price)*this.fuel_tonn
        this.HFO_NMVOC = this.NMVOC*this.fuel_tonn
        this.HFO_PM = this.PM*this.fuel_tonn
        this.HFO_Sox = this.Sox*this.fuel_tonn
        this.HFO_NOx = this.Nox*this.fuel_tonn
        this.HFO_CO2 = this.Cf*this.fuel_tonn
        this.HFO_volume = this.fuel_tonn*1000/parseFloat(this.density)
        return {

            HFO_NMVOC : parseFloat(this.HFO_NMVOC.toFixed(2)) ,
            HFO_PM : parseFloat(this.HFO_PM.toFixed(2)),
            HFO_cost : parseFloat(this.HFO_cost.toFixed(2)) ,
            HFO_Sox : parseFloat(this.HFO_Sox.toFixed(2)),
            HFO_NOx :  parseFloat(this.HFO_NOx.toFixed(2)),
            HFO_CO2 : parseFloat(this.HFO_CO2.toFixed(2)),
            HFO_volume : parseFloat(this.HFO_volume.toFixed(2))
          }
      }
    }

    }

 const batteries_properties = {
   supplier:{
      corvus1:{
        supplier: "corvus",
         model: "Corvus Blue Whale",
         batteryType:"Lithoum-ion",
         c_Rate: `0.5 C`,
          c_Rate_peak : "1 C", // peak
         DOD:  "80%",
        // example
        capacity: `2400 kWh`,
          SOC : "",//parseFloat(capacity)*0.2, // SOC cant be less than 20%
         cont_charging_power :"", //capacity/(parseFloat(c_Rate)*60/60),
         peak_charging_power :"", //capacity/(parseFloat(c_Rate_peak)*60/60),
        nor_Voltage: "1075 VDC",
        voltage: " 1142 VDC",
        weight: "23300 kg",
        depth: `2000 mm`,
        width:   `1200  mm`,
        length: `8600  mm`,
      },

      corvus2:{
        supplier: "corvus",
         model: "Orca Energy",
         battery_Type:"Lithoum-ion",
         c_Rate_peak : `6 C`, // peak
          c_Rate: `3 C`,
         lifeCycle: 800, // number of complete charge/dischage before it goes belwo 80%
         DOD: "80 %", // Depth of dischargeis 80%
         voltage:"1100 VDC ", // range 100 to 1200v
        // example
        capacity: "125 kwh",
         SOC : "",//parseFloat(capacity)*0.2, // SOC cant be less than 20%
         cont_charging_power : "",// capacity/(parseFloat(c_Rate)*60/60),
         peak_charging_power : "",//capacity/(parseFloat(c_Rate_peak)*60/60),
        nor_Voltage: "980 VDC",
        weight: "1620 kg",
        heigh: "2200 mm",
        width: "645 mm",
        depth: "705 mm",

      },

      customize:{
         battery_Type:"Lithoum-ion",
         supplier: ` name <input type="text" name="" id="supplier" class="custom_input" required >`,
         c_Rate_peak : `Rate <input type="text" name="" id="c_Rate_peak"  class="custom_input" required >`, // peak
          c_Rate: `rate <input type="text" name="" id="c_Rate" class="custom_input" >`,
         lifeCycle: `value <input type="text" name="" id="lifeCycle" class="custom_input" required >`, // number of complete charge/dischage before it goes belwo 80%
         DOD: `In percentage <input type="text" name="" id="DOD" class="custom_input" required >`, // Depth of dischargeis 80%
         voltage: ` kV <input type="text" name="" id="voltage" class="custom_input" required >`, // range 100 to 1200v
        // example
        capacity: `kWh <input type="text" name="" id="capacity"class="custom_input" required  >`,
         SOC : "",//parseFloat(capacity)*0.2, // SOC cant be less than 20%
         cont_charging_power : "",// capacity/(parseFloat(c_Rate)*60/60),
         peak_charging_power : "",//capacity/(parseFloat(c_Rate_peak)*60/60),
        nor_Voltage: ` VDC <input type="text" name="" id="nor_Voltage" class="custom_input" required >`,
        weight: ` mm <input type="text" name="" id="weight" class="custom_input" required >`,
        height: ` mm <input type="text" name="" id="heigh" class="custom_input" required >`,
        width:` mm <input type="text" name="" id="width" class="custom_input" required >`,
        depth: ` mm <input type="text" name="" id="depth" class="custom_input" >`,
      },
      custom_created:{
    // empty object for storing the new created battery pack by the user.
    }
    }

  }

 const engineData ={
    wartsila2:{
        supplier: "wartsila",
        engint_type: "Wärtsilä 46F",
        Strokes: "4 Stroke",
        speed_type: "Medium-Speed",
        IMO_compliant: " Tier II ",
        model: "14V46F",
        fuel_type: "HFO",
        LHV: "42700 kJ/kg",
        SFOC: "176 g/kWh",
        pistonStroke : "580 mm",
        cylinderBore: "460 mm",
        mean_Presure : "24.9 bar ",
        cylinders: 8,
        cylinder_output: "1200 kW/cyl",
        Engine_Power: "16800 kW",
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
        fuel_type: "MDO",
        LHV: "42700 kJ/kg",
        SFOC: "178,8 g/kWh",
        pistonStroke : "400 mm",
        cylinderBore: "320 mm",
        mean_Presure : "28.9 bar ",
        cylinders: 12,
        cylinder_output: "580 kW/cyl",
        Engine_Power: "6960 kW",
        Engine_speed:" 750 RPM",
        weight: "216 tonnes",
        length: "6875 mm",
        width: "2900 mm",
        heigh: "3940 mm",
      },
      customize:{
          // this used to allow user to customized engine
        supplier: ` <select name="" id="supplier" class="custom_input" required>
                    <option value="">Choose supplier</option>
                    <option value="wartsila">wartsila</option>
                    <option value="MAN">MAN</option>
                    // <option value="">Cat</option>
                </select>`,
        Strokes: ` <select name="" id="Strokes" class="custom_input" required>
                        <option value="">Engine stroke </option>
                            <option value="4 Stroke">4 Stroke</option>
                            <option value="2 Stroke"> 2 Stroke</option>
                     </select>`,
        speed_type: ` <select name="" id="speed_type" class="custom_input" class="custom_input" required>
                       <option value="">Engine speed</option>
                        <option value="Medium-Speed">Medium-Speed</option>
                        <option value="slow-Speed">slow-Speed</option>
                        <option value="fast-Speed"> fast-Speed</option>
                    </select>`,
        // IMO_compliant: " Tier II ",
        // model: "14V46F",
        fuel_type: ` <select name="" id="fuel_type" class="custom_input" required>
                        <option value="">Choose fuel type</option>
                        <option value="MDO">MDO</option>
                         <option value="MGO">MGO</option>
                         <option value="HFO">HFO</option>
                          <option value="LNG">LNG</option>
                      </select>`,
        LHV: "",
        SFOC: ` g/kWh <input type="text" name="" id="SFOC" class="custom_input" required>`,
        Engine_Power: `kW <input type="text" name="" id="Engine_Power" class="custom_input" required>`,
        Engine_speed: `RPM  <input type="text" name="" id="rpm" class="custom_input" required>`,
        pistonStroke : ` mm  <input type="text" name="" id="pistonStroke" class="custom_input" required>`,
        cylinderBore: ` mm  <input type="text" name="" id="cylinderBore" class="custom_input" required>`,
        mean_Presure :` bar <input type="text" name="" id="mean_Presure" class="custom_input" required>`,
        // cylinders: 8,
        // cylinder_output: "1200 kW/cyl",

      },
      custom_created:{
      //empty object to create to hold the user customized engine
    }
}

const Generator_sets = {
    Wärtsilä:{

        GenSet1:{
          supplier:"wartsila",
          GenSET_type: "Wärtsilä 34DF",
          model: "12V34DF",
          frequency: "60 Hz",
          Cylinder_output : "480 kW/cyl",
          IMO_compliant : " Tier III",
          Engine_speed:"720 RPM",
          fuel_type: "MDO",
          SFOC:"",
          LHV: "42700 kJ/kg",
          BSEC : "7590 kJ/kWh",
          pistonStroke : "430 mm",
          cylinderBore: "310 mm",
          mean_Presure : "22.0 bar ",
          cylinders: 12,
          fuel_type: "MDO",
          Engine_Power: "5760 kW",
          Gen_Power: "5530 kW",
          efficiency: 0.95,
          voltage: "13.8 kV",
          weight: "96 tonnes", // kg
          height:"4365 mm",
          length: "10075 mm",
          width: "3060 mm",
        },
        GenSet2:{
          supplier:"wartsila",
          GenSET_type: "Wärtsilä 34DF",
          model: "8V31DF",
          frequency: "50 Hz",
          Cylinder_output : " 550 kW/cyl",
          IMO_compliant : " Tier III",
          Engine_speed:"750 RPM",
          SFOC:"",
          LHV: "42700 kJ/kg",
          BSEC : "7220 kJ/kWh",
          pistonStroke : "430 mm",
          cylinderBore: "310 mm",
          mean_Presure : "27.1 bar ",
          fuel_type: "MDO",
          Engine_Power: "4400 kW",
          Gen_Power: "4225 kW",
          efficiency: 0.95,
          voltage: "13.8 kV",
          weight: "90 tonnes",
          height:"4880 mm",
          length: "9100 mm",
          width: "3110 mm",
       }
   },
   customize:{
    // this used to allow user to customized engine
 supplier: `<select name="genset" id="supplier" class="custom_input" required>
         <option value="">Choose suppler</option>
         <option value="wartsila">wartsila</option>
         <option value="MAN">MAN</option>
         <option value="CAT">CAT</option>
        </select>`,
 // GenSET_type: "Wärtsilä 34DF",
 // model: "12V34DF",

 // cylinders: 12,
 Strokes: ` <select name="" id="Strokes" class="custom_input" required onchange="custom_engine_genset(event)">
              <option value="">Stroke type</option>
             <option value="4 Stroke">4 Stroke</option>
            <option value="2 Stroke"> 2 Stroke</option>
            </select>`,
 speed_type: ` <select name="" id="speed_type" class="custom_input" class="custom_input" required>
               <option value="">Engine speed</option>
                <option value="Medium-Speed">Medium-Speed</option>
                <option value="slow-Speed">slow-Speed</option>
                <option value="fast-Speed"> fast-Speed</option>
                </select>`,
 fuel_type: ` <select name="" id="fuel_type" class="custom_input" required>
            <option value="">Choose fuel</option>
             <option value="MDO">MDO</option>
              <option value="MGO">MGO</option>
              <option value="HFO">HFO</option>
               <option value="LNG">LNG</option>
           </select>`,
 frequency: `Hz  <input type="text" name="" id="frequency" class="custom_input" required>`,
 Engine_speed:`rpm <input type="text" name="" id="rpm" class="custom_input" required>`,
 SFOC: ` g/kWh  <input type="text" name="" id="SFOC" class="custom_input" required>`,
 BSEC : ` Kj/kWh  <input type="text" name="" id="BSEC">`,
 pistonStroke : ` mm <input type="text" name="" id="pistonStroke" class="custom_input" required>`,
 cylinderBore: ` mm  <input type="text" name="" id="cylinderBore" class="custom_input" required> `,
 mean_Presure : ` bar <input type="text" name="" id="mean_Presure" class="custom_input" required>`,
 Engine_Power: `kW  <input type="text" name="" id="Engine_Power">`,
 Gen_Power: `kW <input type="text" name="" id="Gen_Power" class="custom_input" required>`,
 efficiency: `kW <input type="text" name="" id="efficiency" class="custom_input" required>` ,
 voltage:  `kV <input type="text" name="" id="volt" class="custom_input" required>`,
 // weight: "96 tonnes", // kg
 // height:"4365 mm",
 // length: "10075 mm",
 // width: "3060 mm",
},
custom_created:{

}

}
const PowerPlant = {
  main_engine : engineData , // main engne data (engine types and supplier)
  auxilary_engine : Generator_sets, //  generator set data (genset types and supplier)
  battery_pack  : batteries_properties, // different types of battery 
}

//engine
let wartsila32 = engineData.wartsila2
let wartsila46 = engineData.wartsila3
let custom_engine = engineData.customize

//Generator set
let genset = Generator_sets.Wärtsilä
let custom_genset =Generator_sets.customize

//Ship hull and resistance
let shipHull = new ship()
let calResistnace = new resistance()

let propeller = new propellerProperties()
// let engine = new engineSellection()

//Battery
const battery = batteries_properties.supplier
const custom_battery = batteries_properties.supplier.customize
const created_battery = batteries_properties.supplier.custom_created
//power management system

//Engine Margin
// const Engine_Marine = new engineSellection()
const EngineCal = new engineAnalysis()

//alternative fuel
 const fuel_property = new fuel_properties()

 // Environment Data and load 
 const environment = new environment_load()

 
 // Power management system PMS

 const created_engine = engineData.custom_created
  const created_genset =Generator_sets.custom_created
