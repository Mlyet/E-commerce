import React, { Fragment, useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import Header from "../Header/Header";
import { useAuth } from "../../Context";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import "./Cart.css";
const Cart = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const { user } = useAuth();
    const [modal, setModal] = useState(false);
    const [notCompatible, setNotCompatible] = useState([]);
    const [expandedDescriptionIndex, setExpandedDescriptionIndex] = useState(-1);
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setProducts(cart);
    }, []);
    useEffect(() => {
        const cartTotal = products.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
        );
        setTotal(cartTotal);
    }, [products]);

    const updateLocalStorageAndState = (updatedProducts) => {
        setProducts(updatedProducts);
        localStorage.setItem("cart", JSON.stringify(updatedProducts));
    };

    const handleIncrease = (index: string | number) => {
        const updatedProducts = [...products];
        updatedProducts[index].quantity += 1;
        updateLocalStorageAndState(updatedProducts);
    };
    const handleDecrease = (index) => {
        const updatedProducts = [...products];
        if (updatedProducts[index].quantity > 1) {
            updatedProducts[index].quantity -= 1;
            updateLocalStorageAndState(updatedProducts);
        }
    };
    const handleDelete = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        updateLocalStorageAndState(updatedProducts);
    };
    const toggleDescription = (index) => {
        setExpandedDescriptionIndex(
            index === expandedDescriptionIndex ? -1 : index
        );
    };
    const isCartEmpty = products.length === 0;

    const toggleModal = () => {
        setModal(!modal);
    }

    function checkCompatible(old, compatibleItem) {
        for (let i = 0; i < compatibleItem.length; i++) {
            for (let j = 0; j < old.length; j++) {
                if (old[j].id === compatibleItem[i].id) {
                    return true;
                }
            }
        }
        return false;
    }
    const pay = async () => {
        let notcompa = false;
            for (let k = 0; k < products.length; k++) {
                for (let i = k; i < products.length; i++) {
                if (products[k].compatibles && products[i].compatibles && i >= 1) {
                    if (products[i].subcategory.name == "Carte mère" && products[k].subcategory.name == "Boitier PC" || products[i].subcategory.name == "Boitier PC" && products[k].subcategory.name == "Carte mère") {
                        if ( checkCompatible(products[k].compatibles, products[i].compatibles) === false) {
                            setNotCompatible(products[i]);
                            notcompa = true;
                        }
                    }
                    if (products[k].subcategory.name == "Processeur" && products[i].subcategory.name == "Carte mère" || products[i].subcategory.name == "Processeur" && products[k].subcategory.name == "Carte mère") {
                        if ( checkCompatible(products[k].compatibles, products[i].compatibles) === false) {
                            setNotCompatible(products[i]);
                            notcompa = true;
                        }
                    }
                    if (products[k].subcategory.name == "Carte graphiques" && products[i].subcategory.name == "Carte mère" || products[i].subcategory.name == "Carte graphiques" && products[k].subcategory.name == "Carte mère") {
                        if ( checkCompatible(products[k].compatibles, products[i].compatibles) === false) {
                            setNotCompatible(products[i]);
                            notcompa = true;
                        }
                    }
                    if (products[k].subcategory.name == "Alimentation PC" && products[i].subcategory.name == "Boitier PC" || products[i].subcategory.name == "Alimentation PC" && products[k].subcategory.name == "Boitier PC") {
                        if ( checkCompatible(products[k].compatibles, products[i].compatibles) === false) {
                            setNotCompatible(products[i]);
                            notcompa = true;
                        }
                    }
                    if (products[k].subcategory.name == "Stockage" && products[i].subcategory.name == "Carte mère" || products[i].subcategory.name == "Stockage" && products[k].subcategory.name == "Carte mère") {
                        if ( checkCompatible(products[k].compatibles, products[i].compatibles) === false) {
                            setNotCompatible(products[i]);
                            notcompa = true;
                        }
                    }
                    if (products[k].subcategory.name == "Mémoire" && products[i].subcategory.name == "Carte mère" || products[i].subcategory.name == "Mémoire" && products[k].subcategory.name == "Carte mère") {
                        if ( checkCompatible(products[k].compatibles, products[i].compatibles) === false) {
                            setNotCompatible(products[i]);
                            notcompa = true;
                        }
                    }
                    if (products[k].subcategory.name == "Mémoire" && products[i].subcategory.name == "Processeur" || products[i].subcategory.name == "Mémoire" && products[k].subcategory.name == "Processeur") {
                        if ( checkCompatible(products[k].compatibles, products[i].compatibles) === false) {
                            setNotCompatible(products[i]);
                            notcompa = true;
                        }
                    }

                }
            }
            }
            
            if (notcompa || notCompatible.id) {
            console.log(notCompatible)
                if (!confirm("Êtes vous sur de vouloir continuer avec des articles incompatibles ?")) {
                    return;
            }
        }
        //the thing to check if the user connected if so dont ask to connect else popup the thing 
        if (user.email === "" || user.email !== "") {
            toggleModal();
        }
    }

    return (
        <>
            <Header />
            <div className="bg-gray-300 mx-3 md:mx-24 rounded p-4 flex-col md:flex-row justify-center mt-7 mb-7">
                <h2 className="text-2xl font-semibold mb-4">Mon panier</h2>
                {isCartEmpty ? (
                    <p className="text-xl font-semibold">
                        Votre panier est vide.
                    </p>
                ) : (
                    <>
                        {products.map((product, index) => (
                            <Fragment key={product.id}>
                                <div
                                    className="cart__container border border-black rounded-md p-4 mb-3 flex flex-col md:flex-row items-center"
                                    style={{ minHeight: "150px" }}
                                >
                                    <div className="flex flex-col items-center md:items-start md:flex-row">
                                        <img
                                            src={
                                                "http://145.239.142.113:4031/" +
                                                product.image1
                                            }
                                            alt="product"
                                            className="w-20 h-20 rounded-md object-cover mr-4 mb-4 md:mb-0"
                                        />
                                        <div className="md:w-2/3">
                                            <Link to={"/article/" + product.id}>

                                                <h4
                                                    className="text-lg font-semibold"
                                                    style={{ minHeight: "30px" }}
                                                >

                                                    {product.name}
                                                </h4>
                                            </Link>

                                            <span
                                                className="text-black"
                                                style={{ minHeight: "20px" }}
                                            >
                                                Price: {product.price} €
                                            </span>
                                            <div className="mt-2 flex items-center">
                                                <button
                                                    onClick={() =>
                                                        handleDecrease(index)
                                                    }
                                                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full"
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={product.quantity}
                                                    readOnly
                                                    className="w-12 mx-2 text-center bg-gray-100"
                                                />
                                                <button
                                                    onClick={() =>
                                                        handleIncrease(index)
                                                    }
                                                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    toggleDescription(index)
                                                }
                                                className="text-black font-semibold hover:underline focus:outline-none mt-2 block"
                                            >
                                                {expandedDescriptionIndex === index
                                                    ? "Masquer"
                                                    : "Voir plus"}
                                            </button>
                                            {expandedDescriptionIndex === index && (
                                                <p className="text-black mt-2">
                                                    {product.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="text-black-500 hover:text-red-700 ml-auto"
                                    >
                                        <BsFillTrashFill />
                                    </button>

                                </div>
                            </Fragment>
                        ))}
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-xl font-semibold">
                                Total: {total.toFixed(2)} €
                            </p>
                            <button onClick={() => pay()} className="bg-gray-800 text-white px-4 py-2 rounded-md">
                                Paiement
                            </button>
                        </div>
                    </>
                )}
            </div>

            {modal === true ? (
                <div className="modal">
                    <div className="overlay"></div>
                    <div className="contante bg-white p-3">
                        <button className="close-btn" onClick={toggleModal}><IoMdCloseCircle /></button>
                        <p>continue with</p>
                        <Link to={`/login`}><button className="px-2 bg-slate-200 m-1 ">Login</button> </Link>
                        <p>Or</p>
                        <Link to={`/Payment`}><button className="px-2 bg-slate-200 m-1">payment</button></Link>
                    </div>
                </div>
            ) : <></>}
        </>
    );
};
export default Cart;