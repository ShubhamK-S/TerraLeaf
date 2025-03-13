import React, { useEffect, useState, useContext } from "react";
import "./style.css";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DoneAllIcon from '@mui/icons-material/DoneAll';

import { MyContext } from "../../App";

const Product = (props) => {
    const [productData, setProductData] = useState();
    const [isAdded, setIsadded] = useState(false);
    const context = useContext(MyContext);

    useEffect(() => {
        setProductData(props.item);
    }, [props.item]);

    const setProductCat = () => {
        sessionStorage.setItem("parentCat", productData.parentCatName);
        sessionStorage.setItem("subCatName", productData.subCatName);
    };

    const addToCart = (item) => {
        context.addToCart(item);
        setIsadded(true);
    };

    const openARView = (productLink) => {
        const arViewer = window.open("", "_blank");
        arViewer.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>AR Viewer</title>
                <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
                <script src="https://cdn.rawgit.com/jeromeetienne/AR.js/2.0.8/aframe/build/aframe-ar.js"></script>
            </head>
            <body style="margin: 0; overflow: hidden;">
            <iframe src="${productLink}" frameborder="0" scrolling="yes" seamless="seamless" style="display:block; width:100%; height:100vh;" allow="camera;gyroscope;accelerometer;magnetometer;xr-spatial-tracking;microphone;"></iframe>
            </body>
            </html>
        `);
    };

    return (
        <div className="productThumb" onClick={setProductCat}>
            {props.tag !== null && props.tag !== undefined && (
                <span className={`badge ${props.tag}`}>{props.tag}</span>
            )}

            {productData !== undefined && (
                <>
                    <Link to={`/product/${productData.id}`}>
                        <div className="imgWrapper">
                            <div className="p-4 wrapper mb-3">
                                <img
                                    src={productData.catImg + "?im=Resize=(420,420)"}
                                    className="w-100"
                                />
                            </div>

                            <div className="overlay transition">
                                <ul className="list list-inline mb-0">
                                    <li className="list-inline-item">
                                        <a className="cursor" tooltip="Add to Wishlist">
                                            <FavoriteBorderOutlinedIcon />
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a className="cursor" tooltip="Compare">
                                            <CompareArrowsOutlinedIcon />
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a className="cursor" tooltip="Quick View">
                                            <RemoveRedEyeOutlinedIcon />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Link>

                    {productData.parentCatName !== "Gardeners" && (
                        <button
                            className="camera-btn"
                            onClick={() => openARView(productData.link)}
                        >
                            3D View
                        </button>
                    )}

                    <div className="info">
                        <span className="d-block catName">{productData.brand}</span>
                        <h4 className="title">
                            <Link>{productData.productName.substr(0, 50) + "..."}</Link>
                        </h4>
                        <Rating
                            name="half-rating-read"
                            value={parseFloat(productData.rating)}
                            precision={0.5}
                            readOnly
                        />
                        <span className="brand d-block text-g">
                            By <Link className="text-g">{productData.brand}</Link>
                        </span>

                        <div className="d-flex align-items-center mt-3">
                            <div className="d-flex align-items-center w-100">
                                <span className="price text-g font-weight-bold">
                                    Rs {productData.price}
                                </span>{" "}
                                <span className="oldPrice ml-auto">
                                    {" "}
                                    Rs {productData.oldPrice}
                                </span>
                            </div>
                        </div>

                        {productData.parentCatName !== "Gardeners" ? (
                            <Button
                                className="w-100 transition mt-3"
                                onClick={() => addToCart(productData)}
                            >
                                {isAdded === true ? <DoneAllIcon /> : <ShoppingCartOutlinedIcon />}
                                {isAdded === true ? "Added" : "Add"}
                            </Button>
                        ) : (
                            <Button
                                className="w-100 transition mt-3"
                                onClick={() => addToCart(productData)}
                            >
                                {isAdded === true ? <DoneAllIcon /> : <ShoppingCartOutlinedIcon />}
                                {isAdded === true ? "Booked" : "Book"}
                            </Button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Product;
