const PaymentRightStyling = () => {
    return (
        <style global jsx>{`
        .hl_payment_right{width: 412px;position: sticky;top:10px;}
       .hl_payment_right_white{background-color: #fff;display: inline-block;width: 100%;font-size:0;}
       .hl_offer_greentag{position: absolute;top:2px;left:0;width: 14px;height: 14px;background: url(https://akam.cdn.jdmagicbox.com/images/icontent/newwap/hyperlocal/hl_price_tab_icon.svg) no-repeat;}
       .hl_right_offer_wrap{position: relative;padding-left: 28px;}
       

           @media all and (min-width: 768px) and (max-width: 1024px){
               .hl_payment_right{width: 300px;}
           }
     `}</style>
    )
}

export default PaymentRightStyling
