function PaymentFailedPopup() {
    return (        
    <>

         <style global jsx>{`
            /* Payment Success added  Popup */
            .paySuccess_popup .pop_middle {width: 375px; }
            .mt-12 {margin-top:12px; } .mt-16 {margin-top:16px; }
            .success-icn {background: url(https://akam.cdn.jdmagicbox.com/images/icontent/hyperlocal/hl_sucess.svg) no-repeat; width: 64px; height: 64px; display: inline-block; background-size: 64px; }
            /* Payment Success added  Popup */
      `}</style>
        <>
            <div className="popwrp paySuccess_popup">
                <div className="pop_middle ">
                    <div className="pop_modal_header pt-15">
                        <div className="modal_head_center ml-20"></div>
                        <div className="modal_head_right"><span className="pop_close_icon curs_pointer" /></div>
                    </div>
                    <div className=" pl-25 pr-25 tcenter">
                        <div className="mt-5"> <i className="success-icn"> </i> </div>
                        <div className="font20 color339 fw500 mt-16"> Payment Received</div>
                        <div className="font18 color111 fw500 mt-16"> Thank you for your order! </div>
                        <div className="font15 color111 fw400 mt-12"> We will notify you once your order has been accepted by the seller. </div>
                        <div className="font15 color111 fw400 mt-25"> You can track your order status from </div>
                        <div className="font15 color007 fw700 mt-12 mb-30 "> <span className="curs_pointer p-10">My Orders</span> </div>
                    </div>
                </div>
            </div>
        </>
    </>
    )
}
  
export default PaymentFailedPopup