/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
function Navigation() {
    return (        
    <>

        <style jsx global>
        {`

             /*nav bar section css*/
         .hl_navbar{background-color: #fff;}
         .hl_nav_inner{padding:0 20px;height:40px;position: relative;display: flex;justify-content: space-between;align-items: center;width:100%;}
         .hl_nav_ul{display: flex;width:100%;align-items:center;justify-content: space-between;}
         .hl_nav_ul > li{display: inline-table;padding-right: 15px;cursor: pointer;height:40px;position:relative}
         .hl_nav_ul > li:last-child{padding-right:0;}
         .hl_navli_img{width: 68px;}
         .hl_navli_img img{width: 60px;height: 60px;object-fit: contain;object-position: center;}
         /*.hl_navli_right{padding-top: 18px;}*/
         .hl_navli_text{font-weight:600;padding:0 0 0 0;position: relative;}
         .hl_nav_more{width: 48px;}
         .hl_nav_new{position: absolute;bottom:0;left:0;border-radius: 6px; background-color: #ff4836;padding:2px 4px 1px;font-size: 7px;color:#fff;font-weight:700;text-align: center;}
         .hl_navdown_arrow{vertical-align: middle; display: inline-table;width: 14px;height: 14px;background:url(https://akam.cdn.jdmagicbox.com/images/icontent/newwap/hyperlocal/hl_blackdown_arrow.svg) no-repeat;}
         .hl_nav_moreicon{cursor: pointer; display: inline-block;width: 48px;height: 48px;background:url(https://akam.cdn.jdmagicbox.com/images/icontent/newwap/hyperlocal/hl_navmore_icon.svg) no-repeat;}
         
         

            .hot_icon{background-image:url(https://akam.cdn.jdmagicbox.com/images/icontent/hyperlocal/hl_navhot_icon.svg);width:20px;height:20px;margin-right:10px;display:inline-flex}
            .hl_nav_ul > li:hover .navigation_dropdown{display:block;}
            .hl_nav_ul > li .navigation_dropdown{display:none;position:absolute;box-shadow:2px 2px 15px 0 rgba(169,169,169,0.3);background-color:#fff;z-index:2;top:100%;left:0;min-width:240px}
            .hl_nav_ul > li .navigation_dropdown:before{position:absolute;content:'';border-left:7px solid transparent;border-bottom:10px solid #fff;border-right:7px solid transparent;top:-10px;left:50%}
            .hl_nav_ul > li .navigation_dropdown .navdropdown_innerbox{position:absolute;left:100%;top:0;box-shadow:2px 2px 15px 0 rgba(169,169,169,0.3);background-color:#fff;display:none;width:510px;flex-flow:row nowrap;height:100%}
            .hl_nav_ul > li .navigation_dropdown .navdropdown_items{padding:20px 0 10px}
            .hl_nav_ul > li .navigation_dropdown .navdropdown_itemanchor{padding:12px 30px;font-size:14px;color:#111;font-weight:400;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;width:100%}
            .hl_nav_ul > li .navigation_dropdown .navdropdown_itemanchor:hover{color:#0076d7;font-weight:600}
            .hl_nav_ul > li .navigation_dropdown .navdropdown_item:hover .navdropdown_innerbox{display:inline-flex}
            .hl_nav_ul > li .navigation_dropdown .navdropdown_item .navdropdown_itemrow{position:relative;}
            .hl_nav_ul > li .navigation_dropdown .navdropdown_item.active .navdropdown_itemrow:before{position:absolute;content:'';border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:10px solid #efefef;top:30px;right:0}
            .hl_nav_ul > li .navigation_dropdown .navdropinner_textbox{width:50%;padding:20px 0 10px;flex:none}
            .hl_nav_ul > li .navigation_dropdown .navdropinner_items{display:inline-flex;width:100%;border-right:1px solid #f7f7f7;flex-flow:row wrap}
            .hl_nav_ul > li .navigation_dropdown .navdropinner_head{font-size:13px;color:#777;text-transform:uppercase;padding:12px 30px}
            .hl_nav_ul > li .navigation_dropdown .navdropinner_itemanchor{font-size:14px;color:#111;font-weight:400;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;width:100%;padding:12px 30px}
            .hl_nav_ul > li .navigation_dropdown .navdropinner_itemanchor:hover{color:#0076d7;font-weight:600}
            .hl_nav_ul > li .navigation_dropdown .navdropinner_item{display:inline-flex;width:100%;flex-direction:column;height:100%}
            .hl_nav_ul > li .navigation_dropdown .navdropinner_imgebox{padding:40px 30px 10px;width:50%}
            .hl_nav_ul > li .navigation_dropdown .navdropinner_image{width:100%}
            .hl_nav_ul > li:nth-child(n+6) .navigation_dropdown{right:0;left:unset;}
            .hl_nav_ul > li:nth-child(n+6) .navigation_dropdown .navdropdown_innerbox{right:100%;left:unset;}
            .hl_nav_ul > li:nth-child(n+6) .navigation_dropdown .navdropdown_item.active .navdropdown_itemrow:before{border-right:transparent;border-left:10px solid #efefef;right:unset;left:0;}



        @media all and (min-width: 768px) and (max-width: 1024px){
             .hl_header_left{width: 320px;}
             .hl_area_cell{padding-left:50px;}
             .hl_maplogo{left:14px;}
             .hl_header_center{padding:0 30px;}
             .hl_header_right{width: 250px}
         
             .hl_nav_ul > li{padding-right:10px;}
             .hl_nav_ul > li:nth-child(4n){display: none}
             .hl_navli_img{width: 58px;}
             .hl_navli_img img{width: 50px;height: 50px;}
             /*.hl_navli_right{padding-top:12px;}*/
             .hl_nav_more{top:5px;}
         }
         
         @media all and (min-width: 1580px){
             .hl_nav_ul > li{padding-right:30px;}
             .hl_navli_img{width: 74px;}
         }

        `}
        </style>   




        <section className="hl_navbar">
            <div className="hl_container">
                <div className="hl_nav_inner">
                    <ul className="hl_nav_ul">
                        <li>
                            <div className="dcell hl_navli_right">
                                <div className="font14 color111 hl_navli_text">Grocery <span className="hl_navdown_arrow"></span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="dcell hl_navli_right">
                                <div className="font14 color111 hl_navli_text">Mobile <span className="hl_navdown_arrow"></span></div>
                            </div>
                        </li>
                        <li>
                            <div className="dcell hl_navli_right">
                                <div className="font14 color111 hl_navli_text">Fashion <span className="hl_navdown_arrow"></span></div>
                            </div>


                            <div className="navigation_dropdown">
                                <ul className="navdropdown_items">
                                    <li className="navdropdown_item active">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Men's Top Wear </a></div>
                                        <div className="navdropdown_innerbox">
                                            <div className="navdropinner_textbox">
                                                <div className="navdropinner_head">More in Men's Top Wear</div>
                                                <ul className="navdropinner_items">
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">All</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's T-Shirts</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's T-Shirts</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Formal Shirts</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Kurtas</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Ethnic Sets</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Blazers</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Raincoat <span className="navdropdown_itemanchor_icon new_icon"></span></a></li>
                                                </ul>
                                            </div>
                                            <div className="navdropinner_imgebox">
                                                <img className="navdropinner_image" src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/jdservice/b2bw_default.svg" />

                                            </div>
                                        </div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Men's Bottom Wear </a></div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Women's Ethnic </a></div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Women Western</a></div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Men's Footwear </a></div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Women's Footwear <span className="navdropdown_itemanchor_icon hot_icon"></span></a></div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Watches and Accessories </a></div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Bags, Suitcases & Luggage </a></div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Kids </a></div>
                                    </li>

                                </ul>
                            </div>











                        </li>
                        <li>
                            <div className="dcell hl_navli_right">
                                <div className="font14 color111 hl_navli_text">Electronics <span className="hl_navdown_arrow"></span></div>
                            </div>
                        </li>
                        <li>
                            <div className="dcell hl_navli_right">
                                <div className="font14 color111 hl_navli_text">Home <span className="hl_navdown_arrow"></span></div>
                            </div>
                        </li>
                        <li>
                            <div className="dcell hl_navli_right">
                                <div className="font14 color111 hl_navli_text">Beauty <span className="hl_navdown_arrow"></span></div>
                            </div>
                        </li>
                        <li>
                            <div className="dcell hl_navli_right">
                                <div className="font14 color111 hl_navli_text">Appliances <span className="hl_navdown_arrow"></span></div>
                            </div>
                        </li>
                        <li>
                            <div className="dcell hl_navli_right">
                                <div className="font14 color111 hl_navli_text">Kids <span className="hl_navdown_arrow"></span></div>
                            </div>


                            <div className="navigation_dropdown">
                                <ul className="navdropdown_items">
                                    <li className="navdropdown_item ">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Men's Top Wear </a></div>
                                        <div className="navdropdown_innerbox">
                                            <div className="navdropinner_textbox">
                                                <div className="navdropinner_head">More in Men's Top Wear</div>
                                                <ul className="navdropinner_items">
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">All</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's T-Shirts</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's T-Shirts</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Formal Shirts</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Kurtas</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Ethnic Sets</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Blazers</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Raincoat <span className="navdropdown_itemanchor_icon new_icon"></span></a></li>
                                                </ul>
                                            </div>
                                            <div className="navdropinner_imgebox">
                                                <img className="navdropinner_image" src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/jdservice/b2bw_default.svg" />
                                            </div>
                                        </div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Men's Bottom Wear </a></div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Women's Ethnic </a></div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Women Western</a></div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Men's Footwear </a></div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Women's Footwear <span className="navdropdown_itemanchor_icon hot_icon"></span></a></div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Watches and Accessories </a></div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Bags, Suitcases & Luggage </a></div>
                                    </li>
                                    <li className="navdropdown_item active">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Kids </a></div>
                                        <div className="navdropdown_innerbox">
                                            <div className="navdropinner_textbox">
                                                <div className="navdropinner_head">More in Men's Top Wear</div>
                                                <ul className="navdropinner_items">
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">All</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's T-Shirts</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's T-Shirts</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Formal Shirts</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Kurtas</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Ethnic Sets</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Blazers</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Raincoat <span className="navdropdown_itemanchor_icon new_icon"></span></a></li>
                                                </ul>
                                            </div>
                                            <div className="navdropinner_imgebox">
                                                <img className="navdropinner_image" src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/jdservice/b2bw_default.svg" />
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </li>
                        <li>
                            <div className="dcell hl_navli_right">
                                <div className="font14 color111 hl_navli_text">Sports & Fitness <span className="hl_navdown_arrow"></span></div>
                            </div>
                        </li>
                        <li>
                            <div className="dcell hl_navli_right">
                                <div className="font14 color111 hl_navli_text">Automobile & Accessories <span className="hl_navdown_arrow"></span></div>
                            </div>


                            <div className="navigation_dropdown">
                                <ul className="navdropdown_items">
                                    <li className="navdropdown_item ">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Men's Top Wear </a></div>
                                        <div className="navdropdown_innerbox">
                                            <div className="navdropinner_textbox">
                                                <div className="navdropinner_head">More in Men's Top Wear</div>
                                                <ul className="navdropinner_items">
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">All</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's T-Shirts</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's T-Shirts</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Formal Shirts</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Kurtas</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Ethnic Sets</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Blazers</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Raincoat <span className="navdropdown_itemanchor_icon new_icon"></span></a></li>
                                                </ul>
                                            </div>
                                            <div className="navdropinner_imgebox">
                                                <img className="navdropinner_image" src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/jdservice/b2bw_default.svg" />
                                            </div>
                                        </div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Men's Bottom Wear </a></div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Women's Ethnic </a></div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Women Western</a></div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Men's Footwear </a></div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Women's Footwear <span className="navdropdown_itemanchor_icon hot_icon"></span></a></div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Watches and Accessories </a></div>
                                    </li>
                                    <li className="navdropdown_item">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Bags, Suitcases & Luggage </a></div>
                                    </li>
                                    <li className="navdropdown_item active">
                                        <div className="navdropdown_itemrow"><a className="navdropdown_itemanchor">Kids </a></div>
                                        <div className="navdropdown_innerbox">
                                            <div className="navdropinner_textbox">
                                                <div className="navdropinner_head">More in Men's Top Wear</div>
                                                <ul className="navdropinner_items">
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">All</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's T-Shirts</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's T-Shirts</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Formal Shirts</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Kurtas</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Ethnic Sets</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Blazers</a></li>
                                                    <li className="navdropinner_item"><a className="navdropinner_itemanchor">Men's Raincoat <span className="navdropdown_itemanchor_icon new_icon"></span></a></li>
                                                </ul>
                                            </div>
                                            <div className="navdropinner_imgebox">
                                                <img className="navdropinner_image" src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/jdservice/b2bw_default.svg" />
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </li>



                        
                        
                    </ul>
                </div>
            </div>
        </section>







    </>
    )
}
  
export default Navigation