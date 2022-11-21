import React, { useEffect } from "react";
import Links from "../../components/links/Links";
import Footer from "../../components/footer/Footer";
import { Fragment } from "react";

const FaqSeller = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <div className="faq-container">
        <h1>SEllER FAQ</h1>
        <div className="question-container">
          <div className="question">
            <h5>WHEN WILL MY SELLER ACCOUNT BE APPROVED?</h5>
            <p>
              We recognize your interest in wanting to sell on THRILLER. We are
              currently approving sellers manually to cut fraudulent sellers
              out. We do this to provide the best possible experience for our
              sellers, as well as for our buyers.
            </p>
          </div>
          <div className="question">
            <h5>WHAT ARE THE COMMISSIONS FOR SELLING ON THRILLER?</h5>
            <p>
              The amount of the commission fee is 9.5% + 5.5% payment processing
              fee if PayPal is chosen as the preferred payout method, for a
              seller in good standing.
            </p>
            <p>
              If Bank transfer is selected as the preferred payout method, there
              will be no payment processing fee.
            </p>
            <p>
              The commission fee will be deducted from the seller’s listing
              price.
            </p>
            <p>
              Please note that sellers who continue to cancel orders, not ship
              on time, attempt to send items to us that we deem inauthentic or
              unsellable (such as a used pair of sneakers), or attempt to sell
              un-authentic items may receive higher seller fees and/or be banned
              and be prosecuted to the full extent of the law.
            </p>
          </div>
          <div className="question">
            <h5>CAN I CANCEL MY SALE?</h5>
            <p>
              We strive to provide our customers the best possible experience
              when buying no THRILLER. This is why we urge all sellers to keep
              their listings updated and deter from cancelling orders.
            </p>
            <p>
              Please note: failure to complete a sale may include a service fee
              equal to 15% of the transaction price and/or indefinite suspension
              of your account.
            </p>
          </div>
          <div className="question">
            <h5>AS A SELLER, DO I PAY FOR SHIPPING?</h5>
            <p>
              As a seller, your shipping cost is deducted from your total
              payout.
            </p>
            {/* <p>Shipping cots within the UAE: ?</p> */}
          </div>
          <div className="question">
            <h5>WHEN DO SELLERS GET PAID?</h5>
            <p>
              Your payout will be processed as soon as your items have been
              authenticated by our specialists and are on the way to the buyer.
            </p>
          </div>
          <div className="question">
            <h5>HOW DO I CASH OUT?</h5>
            <p>
              When cashing out, It typically takes 1-2 business days for funds
              to arrive in your PayPal account, and 1-5 business days to reflect
              in your bank statement.
            </p>
            <p>
              Please contact{" "}
              <a href="mailto:thefuture@thrillerme.com">
                thefuture@thrillerme.com
              </a>{" "}
              for any inquiries for a hassle-free payout experience.
            </p>
          </div>
          <div className="question">
            <h5>HOW DO I LIST ITEMS FOR SALE?</h5>
            <p>
              If you are not an approved seller, we encourage you to apply by
              clicking Sell Now and filling out all the necessary information.
              Once you get a notification reading your request has been sent,
              all that's left to do is wait on your inbox for approval.
            </p>
            <p>
              If your account is already approved for selling, Congrats! here's
              what to do:
            </p>
            <p>
              Navigate to the Sell button on the site to list your items. Start
              by searching for the SKU, which can be found on the side of the
              box or inside the item. Select your price and list.
            </p>
            <p>
              Please note that by listing you agree that the sneakers are unworn
              with all the laces, cards, or anything that comes stock with the
              shoe, including the original, undamaged box.
            </p>
            <p>
              As well as agreeing that you can ship within 2 business days of
              sale to avoid any penalties.
            </p>
          </div>
          <div className="question">
            <h5>CAN I LIST ITEMS THAT JUST CAME OUT TODAY?</h5>
            <p>
              Of course! New release sneakers are given a time extension for
              shipping. Sellers have 3 business days to ship. All sneakers sold
              over the day or the weekend of their original release will have 2
              business days to ship.
            </p>
          </div>
          <div className="question">
            <h5>MY ITEMS JUST SOLD. WHAT DO I DO NEXT?</h5>
            <p>
              Congrats on your sale! Before you sit back counting cash, here are
              a few steps.
            </p>
            <p>
              Now that a buyer chose to purchase your item, You have 2 business
              days to ship.
            </p>
            <p>
              We've partnered with quiqup to provide the best possible shipping
              experience for our sellers. To arrange a pick-up, simply navigate
              to your Seller dashboard under Account Settings.
            </p>
            <p>-Find your pending orders.</p>
            <p>
              -Click on Request Courier. This will call a rider to pick up the
              item from the location you entered under your Seller Information.
            </p>
            <p>
              Please only ship with the shipping label provided to avoid any
              mishaps.
            </p>
            <p>
              *Please make sure you are available for up to 4 hours upon
              clicking the Request Courier button. If you fail to ship the item
              at the time, you may contact us at{" "}
              <a href="mailto:shipping@thrillerme.com">
                shipping@thrillerme.com
              </a>{" "}
              to arrange a new pickup, and your seller account will be reviewed*
            </p>
            <p>
              As soon as your item is delivered and verified by our specialists,
              you'll receive your payout.
            </p>
            <p>
              Please only ship with the shipping label provided to avoid any
              mishaps.
            </p>
          </div>
          <div className="question" id="how_do_i_ship_sold_items">
            <h5>HOW DO I SHIP THE ITEMS I’VE SOLD?</h5>
            <p>
              Once a transaction is complete, your shipping deadline can be
              found in the confirmation email we send you.
              <ul style={{ listStyleType: "disc", marginLeft: "30px" }}>
                <li>
                  Package your item into a bigger and sufficiently sized
                  shipping box (double-boxed is recommended) with bubble wrap or
                  packing paper to ensure the item is secure while in transit.
                </li>
                <li>
                  Properly tape and secure the shipping box using the H-method
                  <a href="https://howtoship.com/packing-shipping-101-h-taping-method">
                    {" "}
                    howtoship.com/packing-shipping-101-h-taping-method
                  </a>
                  .
                </li>
                <li>
                  *Only if you are shipping from outside of Dubai* Tape or
                  insert the provided Quiqup label that corresponds to that
                  specific sale to the outside of the shipping box. This will
                  ensure that your transaction is properly processed without
                  delay. You will receive one prepaid shipping label for each
                  item you sell.
                </li>
                <li>
                  Once the item is properly packed FOLLOW QUIQUP INSTRUCTIONS.
                </li>
              </ul>
              <p>
                Notes:
                <ul style={{}}>
                  <li>Please do not ship items using only the shoebox.</li>
                  <li> You must ship each sale made separately.</li>
                  <li>
                    THRILLER is not responsible for items not packaged properly.
                  </li>
                  <li>
                    If any of the main criteria is not met to a standard that we
                    deem fit in our sole and reasonable discretion your seller
                    rating may drop and you may be suspended from selling.
                  </li>
                </ul>
              </p>
            </p>
          </div>
          {/* <div className="question">
            <h5>HOW DO I GET MY PREPAID SHIPPING LABEL?</h5>
            <p>
              Once your sale in confirmed, a confirmation email will be sent
              along with a prepaid, pre-addressed shipping label
            </p>
          </div> */}
          <div className="question">
            <h5>
              I ACCEPTED AN OFFER, BUT THE ORDER DID NOT GO THROUGH. WHAT
              HAPPENED?
            </h5>
            <p>
              This is likely due to the buyer having insufficient funds. When
              buyers place offers, we issue a pre-authorization to ensure they
              have sufficient funds, although, there is no guarantee that the
              funds are still available at the time that the offer is accepted.
            </p>
          </div>
          <div className="question">
            <h5 style={{ textTransform: "uppercase" }}>
              I AM A NEW SELLER, WHY IS MY ACCOUNT SUSPENDED?
            </h5>
            <p>
              We suspend sellers who attempt:
              <ul style={{ listStyleType: "disc", marginLeft: "30px" }}>
                <li>To try and sell inauthentic items time and time again.</li>
                <li>Fail to ship within the allotted time frame.</li>
                <li>
                  Attempt to sell and ship us an item that isn’t authentic or
                  doesn’t exactly match the item as it is described.
                </li>
              </ul>
              f you feel as though your seller account was cancelled or
              suspended by mistake, please email{" "}
              <a href="mailto:thefuture@thrillerme.com">
                {" "}
                thefuture@thrillerme.com
              </a>
              .
            </p>
          </div>
          <div className="question">
            <h5 style={{ textTransform: "uppercase" }}>
              WHAT HAPPENS IF MY ITEMS ARE FOUND TO BE FAKE?
            </h5>
            <p>
              If you send items to us that we deem inauthentic or unsellable at
              our sole and reasonable discretion, the buyer will be refunded the
              full amount they paid for the items and you will have the option
              to have the items sent back to you or disposed of by us. If you
              choose to have the items sent back to you, we will send you an
              invoice for the shipping costs back to you.
            </p>
            <p>
              Please note: It is our hope that through our efforts, we can
              achieve a safe, smart, and easy marketplace.
            </p>
          </div>
          <div className="question" id="product_guidline">
            <h5>PRODUCT GUIDELINES</h5>
            <p>
              We only accept authentic sneakers that are brand new, unworn and
              are complete with an original box including the box lid and the
              box label indicating the shoe size, as would be acceptable for
              sale at a retail location. The sneakers also may or may not
              include additional accessories such as laces or cards that were
              included in the original packaging at purchase. All sneakers must
              come in the original box, which may have encountered minimal
              damage from shipping, discoloration from storage, and/or any
              normal wear and tear due to aging. Some pairs will pass having
              slight manufacturer flaws and imperfections that are
              uncontrollable. When it comes to boxing conditions, we do allow
              the original box to be slightly damaged, such as minor dents.
              Anything more will pass or fail at our sole discretion.
            </p>
          </div>
        </div>
      </div>
      <Links />
    </Fragment>
  );
};

export default FaqSeller;
