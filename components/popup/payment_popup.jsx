import Header1 from '../headerFooterNavigation/header1'
import PaymentFailedPopup from './paymentfailed'
import PaymentSuccessPopup from './paymentsuccess'
import OnlineTransactionFeePopup from './onlinetransactionfeepopup'










function PaymentPopup() {
    return (        
    <>

         <style global jsx>{`      
            
         /*Popup*/
            .popwrp {top: 0; left: 0; width: 100%; height: 100%; position: fixed; z-index: 10; background: rgba(0, 0, 0, .5); overflow-y: auto; }
            .pop_middle {width: 594px; min-height: 120px; max-height: calc(100% - 100px); display: block; background-color: #fff; padding: 0; border-radius: 12px; position: absolute; top: 50%; left: 50%; -webkit-transform: translate3d(-50%, -50%, 0); transform: translate3d(-50%, -50%, 0); overflow: hidden; overflow-y: auto; }
            .pop_headerbx {padding: 20px; }
            .pop_modal_header {display: -webkit-inline-box; display: -webkit-inline-flex; display: -ms-inline-flexbox; display: inline-flex; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; width: 100%; position: sticky; top: 0; z-index: 50; background: #fff; }
            .pop_modal_header .modal_head_left {width: 80px; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-align-items: left; -webkit-box-align: left; -ms-flex-align: left; align-items: left; -webkit-box-pack: start; -webkit-justify-content: flex-end; -ms-flex-pack: start; justify-content: flex-end; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; }
            .pop_modal_header .modal_head_center { width: calc(100% - 88px); display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-align-items: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: start; -webkit-justify-content: flex-start; -ms-flex-pack: start; justify-content: flex-start; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; }
            .modal_head_right {text-align: right; width: 50px; padding-right: 0; }
            .pop_login_pop .pop_login_logo {border-right: 1px solid #f2f5f8; width: 120px; height: 40px; -webkit-align-items: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; padding-right: 20px; }
            .pop_modal_header .pop_login_text {display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; }
            .pop_close_icon {background: url('https://akam.cdn.jdmagicbox.com/images/icontent/hyperlocal/closeicn.svg') no-repeat; width: 36px; height: 36px; background-size: 36px; display: inline-block; }
            .pop_modal_header .pop_close_icon {position: relative; top: 2px; }
            .pop_headerbx .pop_close_icon {position: absolute; right: 20px; top: 20px; }
            .divideline {width: 100%; height: 1px; background-color: #f2f2f2; }
            .divideline.hsticky {position: sticky; top: 71px;}
            .header_bdr {border-bottom:1px solid #f2f2f2 }
        /*Popup*/
        @charset "utf-8";
      `}</style>
        <div>
                <Header1 />                
                
                <PaymentFailedPopup/>
                <PaymentSuccessPopup />
                <OnlineTransactionFeePopup />

                
        </div>
    </>
    )
}
  
export default PaymentPopup