import React from "react";
import { Link } from "react-router-dom";
import "./faq-page.styles.scss";
import Links from "../../components/links/Links";
import Footer from "../../components/footer/Footer";
import { Fragment } from "react";
export const FAQPage = () => {
  return (
    <Fragment>
      <div className="faq-container">
        <h1>FAQ</h1>
        <div className="question-container">
          <div className="question">
            <h5>WHAT IS THRILLER?</h5>
            <p>
              Thriller is the first online marketplace to buy and sell authentic
              sneakers in the United Arab Emirates.
            </p>
            <p>
              Founded to bring trust to the sneaker community, the online
              platform offers items from the world’s leading contemporary and
              designer brands.
            </p>
            <p>
              Using a live ‘offer/ask’ marketplace, buyers pursue countless
              listings, surfacing styles from all walks of past, present and
              future.
            </p>
            <p>
              While sellers list their items at their desired asking price,
              buyers pursue countless listings. Once the transaction meets, the
              products are shipped to us for verification. Once verified, we
              ship them to you. You prosper, knowing you got your sneaker for
              the best price possible with complete visibility, guaranteed
              authentic.
            </p>
          </div>
          <div className="question">
            <h5>AUTHENTICITY</h5>
            <p>
              Our goal is to be the most trusted marketplace for buying and
              selling sneakers.
            </p>
            <p>
              Sourcing from premium retailers and our trusted chain of resellers
              ensures that we only sell authentic items.
            </p>
            <p>
              Additionally, all items are verified by our specialists, who go
              through rigorous training and constant industry updates to ensure
              the product is both authentic and as described.
            </p>
            <p>
              As it is always our hope that buyers get their item, if an order
              does not meet our sole guidelines, we will try to find a
              replacement during the given time. If the order is found to be
              ineligible during our authentication process, we will notify the
              buyer and issue a full refund for your order.
            </p>
            <p>
              It is our hope that through our efforts, we can achieve a safe,
              smart, and easy marketplace.
            </p>
            <p>
              Additionally, all products sold on THRILLER have to meet our
              <a href="/FaqSeller#product_guidline"> product guidelines.</a>
            </p>
          </div>
          <div className="question">
            <h5>SHIPPING AND HANDLING</h5>
            <p>
              We've partnered with Quiqup to offer to ship for our local users,
              so you can easily ship at a discounted rate
            </p>
            <p>
              (For information on how to package and ship for sellers,{" "}
              <a href="/FaqSeller#how_do_i_ship_sold_items">
                HOW DO I SHIP THE ITEMS I’VE SOLD?
              </a>{" "}
              )
            </p>
            <p>
              For buyers, shipping costs cover the expense of getting your item
              from us to you. These costs will be included in the price
              breakdown at the time you place your offer or make your purchase.
              Rates vary based on how many pairs are being shipped.
            </p>
            <p>
              <b>
                <i>
                  Shipping costs within the UAE: 22.5AED <br />
                  Shipping costs outside of Dubai but in the UAE: 20.00AED
                </i>
              </b>
            </p>
          </div>
          <div className="question">
            <h5>WHERE DO YOU SHIP TO?</h5>
            <p>As of now we only ship within the UAE.</p>
          </div>
          <div className="question">
            <h5>DO YOU ACCEPT RETURNS?</h5>
            <p>
              We want you to be happy with your purchase, which is why we accept
              returns on items that are listed as return applicable. Items must
              be new in the box, in the same condition as when shipped, and that
              do not fall within any of the following categories:
            </p>
            <p>
              We do not issue refunds or accept returns or exchanges on any
              items listed as "Last Sale", Items shipped to the wrong address
              provided by the buyer, any used items and any purchase of such
              items are FINAL SALE and we do not issue refunds or accept returns
              for such purchases.
            </p>
          </div>
          <div className="question">
            <h5>HOW DO I SELL?</h5>
            <p>
              To ensure quality and authentic items, we only allow a select
              number of sellers. We encourage you to register as a seller and
              we'll notify you as soon as your request has been approved.
            </p>
          </div>
          <div className="question">
            <h5>HOW DO I BUY?</h5>
            <p>
              Browse items for sale, select your size, and tap Buy now or Offer.
            </p>
          </div>
          <div className="question">
            <h5>WHAT PAYMENT METHODS DO YOU ACCEPT?</h5>
            <p>
              As of now we only accept payments through any major credit card or
              debit card.
            </p>
          </div>
          <div className="question">
            <h5>WHY IS THERE A $1 CHARGE ON MY CREDIT CARD STATEMENT?</h5>
            <p>
              When you register or update the payment information on your
              account, you may see a pending transaction of 1-3AED appear on
              your credit card statement. This is a temporary authorization hold
              to verify your payment method that will be reversed automatically,
              typically within 5-7 business days.
            </p>
          </div>
          <div className="question">
            <h5>HOW DO I KNOW IF THE ITEMS ARE ORIGINAL?</h5>
            <p>
              To ensure all items sold are authentic, sellers are required to
              send their items to us for verification by our specialists. Our
              team receives constant training and industry updates, and knows
              what new fraud trends to look out for.
            </p>
          </div>
          <div className="question">
            <h5>HOW MUCH DOES THE AUTHENTICATION FEE COST?</h5>
            <p>
              Our Authenticity and your trust is the pillar for THRILLER, which
              is why we assure you authentic items at no additional fee to you.
            </p>
          </div>
          <div className="question">
            <h5>HOW DO I MAKE A RETURN?</h5>
            <p>
              You have 2 days to request a return from the date you received the
              item(s). To proceed, submit a request here
              <a href="mailto:thefuture@thrillerme.com">
                {" "}
                thefuture@thrillerme.com.
              </a>
              . <br />
              Once your return is approved and you ship your item and we receive
              your return, the item(s) will be evaluated before your refund is
              made. <br />
              Item(s) must include the return label and packing slip provided by
              us—Please note: Returns will not be processed without a return
              label and packing slip.
            </p>
          </div>
          <div className="question">
            <h5>WHEN WILL I RECEIVE MY ORDER?</h5>
            <p>
              Even due to COVID-19 and government restrictions, all orders are
              shipped on time. Orders typically take between 4-6 days before
              being delivered to you.
            </p>
            <p>
              This includes the time the item takes to get to us as well as for
              authentication and verification.
            </p>
          </div>
          <div className="question">
            <h5>
              CAN I CHANGE MY SHIPPING ADDRESS AFTER MY ORDER HAS BEEN PLACED?
            </h5>
            <p>
              Please note that THRILLER is unable to change the shipping address
              once the order has been placed. We ask you to double-check the
              shipping information under your account settings as well as on the
              checkout page before placing an order.
            </p>
          </div>
          <div className="question">
            <h5>WHY WAS MY ORDER CANCELED?</h5>
            <p>
              There are some circumstances in which sellers are unable to
              complete orders, in which case we will make every effort to find a
              replacement in the given time, but if we are unsuccessful, your
              order will be cancelled.
            </p>
          </div>
          <div className="question">
            <h5>
              I ABSOLOUTLEY NEED MY ORDER NOW OR VERY SOON. WHAT CAN I DO?
            </h5>
            <p>
              We understand that certain buyers require their sneakers as soon
              as possible. That's why we cater to the selected few and will give
              you a precise and guaranteed date of shipping and delivery. To
              make a request, contact{" "}
              <a href="https://thefuture@thrillerme.com">
                thefuture@thrillerme.com.
              </a>{" "}
            </p>
          </div>
          <div className="question">
            <h5>HOW CAN I CONTACT YOU?</h5>
            <p>
              You can contact us 24/7 by submitting a support request, our
              Instagram page{" "}
              <a href="https://www.instagram.com/thrillerme/?hl=en/thrillerme">
                @thrillerme
              </a>
              , or by sending us an email at the{" "}
              <a href="mailto:thefuture@thrillerme.com">
                thefuture@thrillerme.com.
              </a>
            </p>
          </div>
          <div className="question">
            <h5>HOW DO I PLACE AN ORDER?</h5>
            <p>
              Browse items for sale, select your size, and buy immediately at
              the lowest asking price, or make an offer that any seller can
              accept. After your order is confirmed and authenticated by us, it
              will soon be on Its way to you.
            </p>
          </div>
          <div className="question">
            <h5>WHAT IF MY SIZE IS NOT IN STOCK?</h5>
            <p>
              We appreciate your interest in buying on THRILLER. We are
              currently adding and approving sellers on a rolling basis.
              Unfortunately, there are no asks to buy now in that size. You may
              place an offer for the size of your choice, and we hope that it
              will be in stock soon. You may edit or cancel your offer at any
              time.
            </p>
          </div>
        </div>

        <Link to="/FaqSeller">
          <div className="bottom">
            <p>Seller's FAQ</p>
          </div>
        </Link>
      </div>
      <Links />
    </Fragment>
  );
};
