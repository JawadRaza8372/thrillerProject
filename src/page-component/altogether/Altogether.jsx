import React from "react";
import { useState, useEffect } from "react";
import {
  Breadcrumbs,
  makeStyles,
  Typography,
  Container,
  Link,
  TextField,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@material-ui/core";
import { Form } from "react-bootstrap";
import Links from "../../components/links/Links";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "6rem auto",
    [theme.breakpoints.down("md")]: {
      margin: "12rem auto",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0rem auto",
    },
  },
  breadcrumbsLink: {
    fontSize: "1.3rem",
    fontFamily: "proxima-nova, sans-serif",
  },
  breadcrumbs: {
    display: "flex",
    fontSize: "1.3rem",
  },
  breadcrumbsSeprator: {
    margin: "0 1rem",
  },
  sectionHeading: {
    margin: "2rem 0",
    textAlign: "center",
    fontFamily: "proxima-nova, sans-serif",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  textField: {
    padding: "0.5rem",
    border: "1px solid black",
    outline: "red ",
    "&:focus": {
      border: "1px solid red",
    },
  },
  formFieldSection: {
    margin: "1rem 0",
  },
  formLabel: {
    margin: "0.5rem 0",
  },
  requestForm: {
    [theme.breakpoints.down("md")]: {
      margin: "0 auto",
    },
  },
  asterik: {
    color: "Red",
  },
  descriptionField: {
    minHeight: "200px",
    height: "180px",
  },
  documentsViewer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteDocBtn: {
    padding: "10px",
    backgroundColor: "transparent",
    border: "none",
  },
  errorLabel: {
    color: "red",
    margin: "5px 0;",
  },
  submitBtn: {
    border: "none",
    padding: "10px",
    backgroundColor: "rgb(236, 29, 37)",
    color: "#fff",
  },
}));

const Altogether = () => {
  const classes = useStyles();
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState({
    email: "",
    subject: "",
    orderNumber: "",
    role: null,
    questionsAbout: null,
    furtherQuestionsAbout: "",
    description: "",
    files: [],
  });
  const sellerQuestions = [
    "Becoming a Seller",
    "Payout status",
    "I have just sold a shoe",
    "Lowest Ask's and Sell Now ",
    "My account",
    "Return Applicable items",
    "Shipping",
    "Technical issue",
    "My Listings ",
    "Other",
  ];

  const buyerQuestions = [
    "Placing an order",
    "Order status",
    "Order received",
    "Placing an Offer",
    "My Account",
    "Technical issue",
    "Other",
  ];
  const otherQuestions = [
    "A charge I don't recognize",
    "Marketing/Business Inquiry",
    "Placing an Offer",
    "Lowest Ask's and Sell Now",
    "Product Inquiry",
    "Shipping to my country",
    "Other",
  ];

  const moreOptions = {
    Seller: {
      "Becoming a Seller": [
        "Issue submitting an application",
        "pending application",
      ],
      "Payout status": [
        "Where is my payout?",
        "I want to change my Payout method",
      ],
      "I have just sold a shoe": [
        "Having trouble shipping",
        "Status of my shipment",
        "Issue with order at verification centre",
        "My sale was cancelled",
        "Address issue",
      ],
      "Lowest Ask's and Sell Now": [
        "Inquiry about Lowest Asking Price",
        "Inquiry about using Sell Now",
      ],
      "My account": [
        "Reset my account password",
        "Updating my profile",
        "Commission",
        "Un-subscribe from marketing emails",
        "De-activate my Seller account",
      ],
      "Return Applicable items": ["Inquiry about a request to return"],
      Shipping: ["Unable to ship my sold item"],
      "Technical issue": ["iOS", "Android", "Desktop"],
      "My Listings": [
        "Create a new listing",
        "An existing listing",
        "Accepting Offers",
      ],
    },
    Buyer: {
      "Placing an order": [
        ...`Issue with payment/Offers/Payment methods/Sizing`.split("/"),
      ],
      "Order status": [
        ...`Status of my order/Address Issue/Issue with my order at verification centre/My order was cancelled/Package not received/Refund not received`.split(
          "/"
        ),
      ],
      "Order received": ["-"],
      "My Account": [
        ..."Reset my account password/Updating my profile/Un-susbcribe from marketing emails".split(
          "/"
        ),
      ],
      "Technical issue": [..."iOS/Android/Desktop".split("/")],
      Other: ["-"],
    },
    None: {
      "A charge I don't recognize": ["-"],
      "Marketing/Business Inquiry": ["-"],
      "Placing an Offer": [
        ..."Issue with payment/Trouble placing an Offer".split("/"),
      ],
      "Lowest Ask's and Sell Now": ["-"],
      "Product Inquiry": ["-"],
      "Shipping to my country": ["-"],
      Other: ["-"],
    },
  };

  const handleDeleteDocuments = (index) => {
    const newFiles = data.files.filter((file, i) => i !== index);
    setData({ ...data, files: newFiles });
  };
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    console.log("hello");
    if (data.email === "") {
      Swal.fire({
        title: "Error",
        text: "Please enter your email",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    } else if (!validateEmail(data.email)) {
      Swal.fire({
        title: "Error",
        text: "Please enter a valid email",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    } else if (data.subject === "") {
      Swal.fire({
        title: "Error",
        text: "Please enter the subject",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    } else if (data.role === null || data.role === "-") {
      Swal.fire({
        title: "Error",
        text: "Please select the role",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    } else if (data.description === "") {
      Swal.fire({
        title: "Error",
        text: "Please enter the description",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    } else {
      Swal.fire({
        title: "Success",
        text: "Your request has been submitted",
        icon: "success",
        confirmButtonText: "Ok",
      });
      setData({
        email: "",
        subject: "",
        orderNumber: "",
        role: null,
        questionsAbout: null,
        furtherQuestionsAbout: "",
        description: "",
        files: [],
      });
    }
  };

  useEffect(() => {
    console.log("hello");
    setData({
      ...data,
      questionsAbout: null,
    });
  }, [data.role]);
  return (
    <>
      <Container maxWidth="sm" className={classes.root}>
        <div className={classes.breadcrumbs}>
          {/* <Link
            underline="hover"
            className={classes.breadcrumbsLink}
            color="inherit"
            href="/"
          >
            Thriller Support
          </Link>
          <p className={classes.breadcrumbsSeprator}>/</p>
          <Typography color="text.primary" className={classes.breadcrumbsLink}>
            Submit a request
          </Typography> */}
        </div>
        <Typography
          variant="h4"
          color="initial"
          className={classes.sectionHeading}
        >
          Submit a Request
        </Typography>
        <div className={classes.requestForm}>
          <FormControl fullWidth className={classes.formFieldSection}>
            <FormLabel>
              Your email address<span className={classes.asterik}>*</span>
            </FormLabel>
            <input
              type="text"
              className={classes.textField}
              value={data.email}
              onChange={(e) =>
                setData({
                  ...data,
                  email: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl fullWidth className={classes.formFieldSection}>
            <FormLabel>
              Subject<span className={classes.asterik}>*</span>
            </FormLabel>
            <input
              type="text"
              className={classes.textField}
              value={data.subject}
              onChange={(e) => {
                setData({
                  ...data,
                  subject: e.target.value,
                });
              }}
            />
          </FormControl>
          <FormControl fullWidth className={classes.formFieldSection}>
            <FormLabel>Order Number in question </FormLabel>
            <input
              type="number"
              className={classes.textField}
              value={data.orderNumber}
              onChange={(e) => {
                setData({
                  ...data,
                  orderNumber: e.target.value,
                });
              }}
            />
          </FormControl>

          <FormControl fullWidth className={classes.formFieldSection}>
            <FormLabel>
              I am the <span className={classes.asterik}>*</span>
            </FormLabel>
            <select
              className={classes.textField}
              value={data.role}
              onChange={(e) => {
                setData({
                  ...data,
                  role: e.target.value,
                });
              }}
            >
              <option value={null}>-</option>
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
              <option value="None">I don't have an order number</option>
            </select>
          </FormControl>
          {data.role !== null && (
            <FormControl fullWidth className={classes.formFieldSection}>
              <FormLabel>I have a question regarding</FormLabel>
              <select
                className={classes.textField}
                value={data.questionsAbout}
                onChange={(e) => {
                  setData({
                    ...data,
                    questionsAbout: e.target.value,
                  });
                }}
              >
                <option value="">-</option>
                {data.role !== null &&
                  (data.role === "Seller"
                    ? sellerQuestions.map((question, index) => (
                        <option key={index} value={question}>
                          {question}
                        </option>
                      ))
                    : data.role === "Buyer"
                    ? buyerQuestions.map((question, index) => (
                        <option key={index} value={question}>
                          {question}
                        </option>
                      ))
                    : otherQuestions.map((question, index) => (
                        <option key={index} value={question}>
                          {question}
                        </option>
                      )))}
              </select>
            </FormControl>
          )}
          {data.questionsAbout !== null && (
            <FormControl fullWidth className={classes.formFieldSection}>
              <FormLabel>I have a question regarding</FormLabel>
              <select className={classes.textField}>
                {data.questionsAbout !== null &&
                  moreOptions[data.role]?.[data.questionsAbout]?.length > 0 &&
                  moreOptions[data.role][data.questionsAbout].map(
                    (question, index) => (
                      <option key={index} value={question}>
                        {question}
                      </option>
                    )
                  )}
              </select>
            </FormControl>
          )}
          <FormControl fullWidth className={classes.formFieldSection}>
            <FormLabel>
              Description
              <span className={classes.asterik}>*</span>
            </FormLabel>
            <textarea
              className={`${classes.textField} ${classes.descriptionField}`}
              value={data.description}
              onChange={(e) => {
                setData({
                  ...data,
                  description: e.target.value,
                });
              }}
            />
            <span style={{ fontSize: "12px" }}>
              Please enter the details of your request. A member of our support
              staff will respond as soon as possible.
            </span>
          </FormControl>
          <FormControl fullWidth className={classes.formFieldSection}>
            <FormLabel>Attachments</FormLabel>
            <div
              style={{
                position: "relative",
                border: "1px solid black",
                width: "100%",
                lineHeight: "30px",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "12px" }}>Add Files Here</span>
              <input
                type="file"
                style={{
                  opacity: 0.0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  width: "100%",
                  height: "100%",
                }}
                multiple={true}
                onChange={(e) => {
                  setData({
                    ...data,
                    files: Array.from(e.target.files),
                  });
                }}
              />
            </div>
          </FormControl>
          {data.files.length > 0 && (
            <FormControl fullWidth className={classes.formFieldSection}>
              {data.files.map((file, index) => (
                <div className={classes.documentsViewer} key="index">
                  <div>
                    <i className="fa fa-paperclip" aria-hidden="true"></i>{" "}
                    <span>
                      {file.name.length > 25
                        ? `${file.name.slice(0, 25)}...`
                        : file.name}
                    </span>
                  </div>
                  <button
                    className={classes.deleteDocBtn}
                    onClick={() => {
                      handleDeleteDocuments(index);
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
            </FormControl>
          )}
          <FormControl fullWidth className={classes.formFieldSection}>
            <button
              className={classes.submitBtn}
              type="submit"
              onClick={() => {
                console.log("hello");
                handleSubmit();
              }}
            >
              Submit
            </button>
          </FormControl>
        </div>
      </Container>
      <Links />
    </>
  );
};

export default Altogether;
