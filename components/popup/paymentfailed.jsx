function PaymentFailedPopup() {
    return (        
    <>

         <style global jsx>{`
            /* Payment Failed  Popup */
            .payFailed_popup .pop_middle {width: 375px; }
            .mt-12 {margin-top:12px; } .mt-16 {margin-top:16px; }.mt-18 {margin-top:18px; }
            .failed-icn {background: url(https://akam.cdn.jdmagicbox.com/images/icontent/hyperlocal/hl_payment_failed.svg) no-repeat; width: 64px; height: 64px; display: inline-block; background-size: 64px; }
            .lh-22 {line-height: 22px;}
            .payFailed_popup .tryBtnwrp {justify-content: center;}
            .payFailed_popup .tryBtnwrp button {width: 340px; background: #0076d7; border: 0; color: #fff; border-radius: 6px; height: 50px; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-align-items: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; }
            /* Payment Failed  Popup */
      `}</style>
        <>
          <div className="popwrp payFailed_popup">
            <div className="pop_middle ">
                <div className="pop_modal_header pt-15  ">
                    <div className="modal_head_center ml-20"></div>
                    <div className="modal_head_right"><span className="pop_close_icon curs_pointer" /></div>
                </div>
                <div className=" pl-25 pr-25 tcenter">
                    <div className="mt-5 "> <i className="failed-icn"> </i> </div>
                    <div className="font20 colorec4 fw500 mt-18"> Payment Failed </div>
                    <div className="font18 color111 fw500 mt-16"> You can try again &amp; complete the payment </div>
                    <div className="pl-15 pr-15 font15 color111 fw400 mt-16 lh-22"> If money was debited from you account, it will be automatically refunded in 5-6 business days </div>
                    <div className="tryBtnwrp dflexvcenter mt-30 mb-20">
                        <button className="font16 colorfff fw400"> Retry </button>
                    </div>
                    <div className="font16 color0F7 mb-30">Try another payment method</div>
                </div>
            </div>
        </div>
        </>
    </>
    )
}
  
export default PaymentFailedPopup