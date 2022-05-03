const PaymentLeftStyling = () => {
  return (
    <style global jsx>{`
            .hl_payment_left{width: calc(100% - 432px);}
            .hl_payment_left_white{margin:0 0 16px;background: #fff;display: inline-block;width: 100%;}

            .hl_paymentOption_box{border:1px solid #f2f2f2;border-radius: 4px;font-size: 0;}
            .hl_pay_chk_lbl input{display:none;}
            .hl_pay_checkbox{display: inline-block;background: #fff;width: 20px;height: 20px;border:2px solid #ccc;border-radius: 2px;cursor: pointer;margin:1px 0 0;}
            .hl_pay_chk_lbl input[type=checkbox]:checked + .hl_pay_checkbox{background: url(https://akam.cdn.jdmagicbox.com/images/icontent/newwap/hyperlocal/hl_rect_blue_chk.svg) no-repeat;border:0}
            .hl_pay_radio_lbl input{display: none}
            .hl_pay_radio{display: inline-block;background: #fff;width: 20px;height: 20px;border:2px solid #ccc;border-radius: 50%;position: relative;text-align: center;cursor: pointer;margin:1px 0 0;}
            .hl_pay_radio_lbl input[type=radio]:checked + .hl_pay_radio{border-color: #0076d7}
            .hl_pay_radio_lbl input[type=radio]:checked + .hl_pay_radio > .hl_pay_radioround{display: inline-block;width: 10px;height: 10px;background: #0076d7;border-radius: 50%;margin:3px 0 0;}
            .hl_upiicon{display:inline-block;width:10px;height:13px;background: url(https://akam.cdn.jdmagicbox.com/images/icontent/newwap/hyperlocal/hl_upi_logo_icon.svg) no-repeat;vertical-align:middle;margin:-1px 0 0 5px}
            .activeoption{background-color: #f2f7fb}
            .hl_payment_left_cell{width: 32px;}
            .hl_pay_flexstart{justify-content: flex-start;align-items: flex-start;display: none}
            .hl_paymentOption_box .activeoption .hl_pay_flexstart{display: flex;}
            .hl_banklogo_sml{width: 24px;height: 24px;background: #fff;border-radius: 50%;border:1px solid #f6f6f6;margin-left: 15px;vertical-align: middle;}
            .hl_pay_label{min-height: 18px;}
            .hl_paynow_btn{width: 150px; height: 44px; border-radius: 6px; background-color: #0076d7;font-size: 16px;color:#fff;font-weight: 600;}
            .hl_payment_selectbx{border-radius: 6px; border: solid 1px #e4eaef; background-color: #fff;width: 290px;height: 46px;font-size: 14px;color:#111;padding:0 15px;}
            .hl_payment_inputbox{width: 201px; height: 46px;padding:0 15px; border-radius: 6px; border: solid 1px #e4eaef; background-color: #fff;}
            .hl_pay_input_wrap{position: relative;}
            .hl_payment_helpicon{position: absolute;top:15px;right:15px;background: url(https://akam.cdn.jdmagicbox.com/images/icontent/hyperlocal/hl_ic_help_question.svg) no-repeat; width: 16px; height: 16px;display: inline-block;}
            .hl_paymentOption_box input[type=text]::-webkit-input-placeholder { /* Chrome/Opera/Safari */
              color: #777;
            }
            .hl_paymentOption_box input[type=text]::-moz-placeholder { /* Firefox 19+ */
              color: #777;
            }
            .hl_paymentOption_box input[type=text]:-ms-input-placeholder { /* IE 10+ */
              color: #777;
            }
            .hl_paymentOption_box input[type=text]:-moz-placeholder { /* Firefox 18- */
              color: #777;
            }
            .hl_pay_select_arw{position: absolute;top:18px;right:15px;background: url(https://akam.cdn.jdmagicbox.com/images/icontent/newwap/hyperlocal/hl_select_downarrow_icon.svg) no-repeat; width: 16px; height: 10px;display: inline-block;}
            .hl_pay_select_wrap{position: relative;}
            .hl_pay_selectpop{position: absolute;top:48px;border-radius: 6px; box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.16); border: solid 1px #e4eaef; background-color: #fff;max-height: 300px;overflow-y: auto;width: 100%; z-index:2;}
            .hl_payselectlbl{padding:13px 15px;border-bottom:1px solid #e4eaef;cursor: pointer;position: relative;background: #fff;z-index: 999}
            .hl_payselectlbl:first-child{border-bottom:5px solid #e4eaef;}
            .hl_payselect_nm{color:#111;font-size: 14px;}
            .hl_payselectlbl.active .hl_payselect_nm{color:#0f76d7;font-weight:600;}
            .hl_payselectlbl.active::after{content:'';position: absolute;top:13px;right:15px;background: url(https://akam.cdn.jdmagicbox.com/images/icontent/newwap/hyperlocal/hl_blue_tickselect_icon.svg) no-repeat;width: 16px;height: 16px;border-radius: 50%;}
            .hl_payment_inputbox2{width: 259px;}
            .hl_flexstart{justify-content: flex-start;align-items: flex-start;}
            .hl_flexstretch {align-items: stretch;}
            .hl_pay_select_brand{display: inline-block;margin-right: 50px;text-align: center;}
            .hl_pay_brand_img{display: inline-block;position: relative;}
            .hl_pay_brand_img img{width: 48px;height: 48px;border:1px solid #f6f6f6;border-radius: 50%;}
            .hl_pay_brandtext{font-size: 12px;color:#777;}
            .hl_pay_select_brand.active .hl_pay_brandtext{font-weight:600;color:#111;}
            .hl_pay_select_brand.active img{border-color: #0f76d7}
            .hl_pay_select_brand.active .hl_pay_brand_img::after{content:'';border-radius: 50%; position: absolute;top:-0px;right:-0px;width: 16px;height: 16px;display: inline-block;background: url(https://akam.cdn.jdmagicbox.com/images/icontent/newwap/hyperlocal/hl_blue_tickselect_icon.svg) no-repeat;}
            .hl_add_promo_box{display: inline-block;width: 300px; height: 46px;padding:0 15px; border-radius: 6px; border: solid 1px #e4eaef; background-color: #fff;position: relative;font-size: 0;}
            .hl_add_promo_box input{height: 44px;padding:0;font-size: 14px;width: 100%;}
            .hl_add_promo_box button{position: absolute;top:8px;right: 10px;border:1px solid #0f76d7; color: #0f76d7;font-weight:600;width: 65px;height: 28px;background: #fff;border-radius: 4px;}
            .hl_add_promo_box button.disabled{opacity: 0.5;}
            .hl_add_promo_box2{position: relative;width: 321px; height: 54px; padding: 9px 15px 9px; border-radius: 6px; border: solid 1px #b7d8b9; background-color: #f7fff7;}
            .hl_add_promo_box2 button{background: transparent;font-size: 12px;color:#111;}
            .hl_remve_code{display: inline-block;width: 14px;height: 14px;background: url(https://akam.cdn.jdmagicbox.com/images/icontent/newwap/hyperlocal/hl_remove_sml_icon.svg) no-repeat;margin:0 2px 0 0;vertical-align: middle;}
            .hl_add_grey_icon{display: inline-block;width: 16px;height: 16px;background: url(https://akam.cdn.jdmagicbox.com/images/icontent/newwap/hyperlocal/hl_plus_grey_icon.svg) no-repeat;margin:4px 0 0;}

            .mt-3 {margin-top: 3px;}.mt-7 {margin-top: 7px;}.mt-18 {margin-top: 18px;}.mt-16 {margin-top: 16px;}.pl-12 {padding-left:12px;}
			.disble_btn{opacity:0.5;}
            .emi_inrcontainer .changeplanbx {width: 100%; height: 60px; padding: 12px 15px; border-radius: 4px; background-color: #fff; margin:23px 0 17px 0;}
            .emi_inrcontainer .changeplanbx .imgbxwrp {width: 36px;}
            .emi_inrcontainer .changeplanbx .imgbx {width: 30px;height: 30px;vertical-align:middle;}
            .emi_inrcontainer .changeplanbx .imgbx img{width: 30px;height: 30px;border-radius:50%;border:1px solid #f6f6f6;font-size:0;vertical-align:middle;}
            .emi_inrcontainer .changeplanbx .changplantd {width:120px; text-align: right;}
            .emi_inrcontainer .changeplanbx .changeplanbtn {min-width: 115px; height: 36px; text-align: center; border-radius: 4px; border:1px solid #0f76d7; background:#fff}
            .emi_inrcontainer .cardnamenumber_wrp {width:60%;}
            .emi_inrcontainer .cardnamenumber_wrp .cardinptBx {width:100%;height: 46px; border-radius: 6px; border: solid 1px #e4eaef; padding:10px 15px;background: #fff;position: relative;}
            .emi_inrcontainer .cardnamenumber_wrp .cardinptBx .inrinput {width:100%;height: 100%;}
            .emi_inrcontainer .cardnamenumber_wrp .cardinptBx .inrinput::placeholder,
            .emi_inrcontainer .cardnamenumber_wrp .cardinptBx .inrinput::-webkit-input-placeholder {color:#777}
            .emi_inrcontainer .dropdownicn {position: absolute; right: 10px; top: 17px; background: url(https://akam.cdn.jdmagicbox.com/images/icontent/hyperlocal/hl_filterdrop_icon.svg) no-repeat; width: 18px; height: 10px; display: inline-block; vertical-align: middle; transform: rotate(180deg);}
			.emi_inrcontainer .cardnamenumber_wrp .err_msg .cardinptBx,.err_msg .hl_payment_inputbox,.err_msg .hl_payment_selectbx{border:1px solid #da4f4f;}
			.emi_inrcontainer .cardnamenumber_wrp .err_txt,.err_txt{color: #da4f4f; display: inline-block; font-size: 12px; margin: 2px 10px;}
            .emi_inrcontainer .cvvicn {position: absolute; right: 10px; top: 14px; background: url(https://akam.cdn.jdmagicbox.com/images/icontent/hyperlocal/hl_ic_help_question.svg) no-repeat; width: 16px; height: 16px; display: inline-block; vertical-align: middle;}
            .emi_inrcontainer .paynowBtn {width: 140px; height: 46px; padding: 6px;border-radius: 6px;background-color: #0076d7;display: inline-flex; align-items: center; justify-content: center;}
            .emi_inrcontainer .sv_card_paywrp {margin-top:16px;}
            .emi_inrcontainer .sv_card_paywrp .addonbx{ width:20px}
            .emi_inrcontainer .sv_card_paywrp .hyp_addon label, 
            .emi_inrcontainer .sv_card_paywrp .hyp_addonbx {width:20px}
            .emi_inrcontainer .sv_card_paywrp .hyp_addonckbx {width:20px; height:20px;background-size: 20px;display: inline-block;}
            .emi_inrcontainer .sv_card_paywrp .hyp_addonbx input:checked + .hyp_addonckbx {width:20px; height:20px;background-size: 20px;}
            .emi_inrcontainer .sv_card_paywrp .contbx {padding-left:16px;}

            .emi_option_wrp .emi_option_left {width: 280px;margin-right:7px;background:#fff;border-top-left-radius:4px;;border-bottom-left-radius:4px;}
            .emi_option_wrp .emi_option_left .bankul{width:100%;padding:3px 3px;border-radius:4px;}
            .emi_option_wrp .emi_option_left .bankli{padding: 5px 10px;position: relative; cursor: pointer;color:#111;font-size:14px;}
            .emi_option_wrp .emi_option_left .bankli.active {background: #f7f7f7;color: #0f76d7;font-weight: 600;}
            .emi_option_wrp .emi_option_left .bankli .imgbx {width: 36px;height: 36px;}
            .emi_option_wrp .emi_option_left .bankli .imgbx img { object-fit: contain; width: 36px;  height: 36px;border:1px solid #f6f6f6;border-radius:50%;}
            .emi_option_wrp .emi_option_left .bankli .bankname {width: calc(100% - 36px); padding-left: 16px;}
            .emi_option_wrp .emi_option_right {width: calc(100% - 287px);background:#fff;border-top-right-radius:4px;;border-bottom-right-radius:4px;}
            .emi_option_wrp .selectemiplan_wrp {padding:20px 16px}
            .emi_option_wrp .selectemiplan_wrp .ulwrp {margin-top: 26px;}
            .emi_option_wrp .selectemiplan_wrp .liwrp {margin-bottom:4px; border-radius: 4px;width:100%;padding:11px 0; width:100%;border: solid 1px #e4eaef;background-color: #fff;}
            .emi_option_wrp .selectemiplan_wrp .liwrp .labelbx {padding:0 10px}
            .emi_option_wrp .selectemiplan_wrp .liwrp .hideshow_contbx {margin-top:13px;display: none;}
            .emi_option_wrp .selectemiplan_wrp .liwrp.active {background:#f9f9f9}
            .emi_option_wrp .selectemiplan_wrp .liwrp.active .hideshow_contbx {display: table;}
            .mt-3 {margin-top: 3px;}
            .emi_option_wrp .selectemiplan_wrp .liwrp .hideshow_contbx .devidercont {border:1px solid #f2f2f2}
            .emi_option_wrp .selPlanBtn { width: 115px; height: 36px; padding: 6px; border-radius: 4px; background-color: #0076d7; display: inline-flex; align-items: center; justify-content: center;}
            /*radio Select Css*/
            .hyp_radiowp{width:100%;display:block;}
            .hyp_radiotxt{width:100%;display:block;color:#414e5a;font-weight:700;text-transform:capitalize;padding:30px 20px 10px;}
            .hyp_radio{width:100%;display:block;}
            .hyp_radio label{width: calc( 100% - 40px );display:table;table-layout:fixed;cursor: pointer;}
            .hyp_radiobx,.hyp_addbxtxt{display:table-cell;vertical-align:middle;}
            .hyp_radiobx{width:20px;}
            .hyp_radiobx input{display:none;}
            .hyp_radiockbx{width:20px;height:20px;display:block;background:url(https://akam.cdn.jdmagicbox.com/images/icontent/hyperlocal/radioi.svg) no-repeat;background-size: 20px;}
            .hyp_radiobx input:checked + .hyp_radiockbx{background:url( http://akam.cdn.jdmagicbox.com/images/icontent/hyperlocal/radioiselect.svg) no-repeat;background-size: 20px;}
            .hyp_addbxtxt{color:#414e5a;padding:0 0 0 20px;}
            /*radio Select Css End*/
            /*Check Box Select Css*/
            .hyp_addonwp{width:100%;display:block;}
            .hyp_addontxt{width:100%;display:block;color:#414e5a;font-weight:700;text-transform:capitalize;padding:30px 20px 10px;}
            .hyp_addon{width:100%;display:block;}
            .hyp_addon label{width: calc( 100% - 40px );display:table;table-layout:fixed;cursor: pointer;}
            .hyp_addonbx,.hyp_addbxtxt{display:table-cell;vertical-align:middle;}
            .hyp_addonbx{width:25px;}
            .hyp_addonbx input{display:none;}
            .hyp_addonckbx{width:25px;height:25px;display:block;background:url(https://akam.cdn.jdmagicbox.com/images/icontent/hyperlocal/checkbox-unselect.svg) no-repeat;}
            .hyp_addonbx input:checked + .hyp_addonckbx{background:url( http://akam.cdn.jdmagicbox.com/images/icontent/hyperlocal/checkbox-selected.svg) no-repeat;}
            .hyp_addbxtxt{color:#414e5a;padding:0 0 0 20px;}
            /*Check Box Select Css End*/
            @media all and (min-width: 768px) and (max-width: 1024px){
                .hl_payment_left{width: calc(100% - 310px);}   
                .hl_payment_selectbx{width:220px;}    
                .hl_payment_inputbox{width:150px;} 
                .emi_inrcontainer .cardnamenumber_wrp{width:90%;} 
                .emi_option_wrp .emi_option_left{width:180px} 
                .emi_option_wrp .emi_option_right{width:calc(100% - 185px)}   
            }
            
       
      `}</style>
  )
}

export default PaymentLeftStyling
