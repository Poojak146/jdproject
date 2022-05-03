const AddGiftPromoCode = () => {
    return (
        <div className="dtbl p-15 activeoption">
            <div className="dcell_top hl_payment_left_cell">
                <span className="hl_add_grey_icon" />
            </div>
            <div className="dcell">
                <div className="">
                    <div className="font16 color111 fw600 mb-5">Add Gift Card or Promo Code</div>
                    <div className="mt-15">
                        <div className="hl_add_promo_box mb-10">
                            <input type="text" name="" placeholder="Enter Gift Card or Promo Code" />
                            <button className="disabled">Apply</button>
                        </div>
                        <br />
                        <div className="hl_add_promo_box2 mb-10">
                            <div className="dflex">
                                <div>
                                    <div className="font14 color339 fw600">Gift Card Applied of ₹ 2,000</div>
                                    <div className="font12 color111">7WWF-BVKH8F-BTVR</div>
                                </div>
                                <button><span className="hl_remve_code" />Remove</button>
                            </div>
                        </div>
                        <div className="font14 color777">Please note Gift card code is applied only once.You does not use it again if you remove it now.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddGiftPromoCode
