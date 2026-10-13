import { useState, useMemo, useEffect } from "react";
import AddToCart from "./AddToCart";
import LayoutCss from "../css/newLayoutCopy.module.css";
import useCommonList from "../hooks/useCommonList";
import { useDispatch } from "react-redux";
import { clearGuestCart } from "../redux/cartSlice";
import { createAttributeMap } from "../utils/attriuteHelper";

export default function ProductInfo({
    product,
    selectedColor,
    setSelectedColor
}) {
    

    const dispatch = useDispatch();
    // dispatch(clearGuestCart());
    /*Variant set at backed */
    const variantDetails = product?.variants || [];

    /* Stores the attributes selected by the user. */
    /* Format : [ { attributeId: "sizeId", value: "M" }, 
                 {attributeId: "colorId", value: "red" } ]
    */
    const [ selectedAttributesByUser, setSelectedAttributes] = useState([]);

    /* unique attributes and their values */
    /* Format : [{ attributeId: "sizeId", values: ["S", "M", "L"]},
                 { attributeId: "colorId", values: ["red", "black"]}]
    */

    const addedAttributes = useMemo(() => {
        const attributes = [];
        variantDetails.forEach((variant) => {
            variant?.attributes?.forEach((attribute) => {
                const existing = attributes.find(item =>item.attributeId === attribute.attributeId);

                
                if (!existing) {
                    attributes.push({
                        attributeId: attribute.attributeId,
                        values: [attribute.value]
                    });
                } else if (
                    !existing.values.includes(attribute.value)
                ) {
                    existing.values.push(attribute.value);
                }
            });
        });
        return attributes;
    }, [variantDetails]);
    /* Collecting attribute ids for their names */
    const attributeIds = useMemo( () =>
        addedAttributes.map(
            item => item.attributeId
        ),
        [addedAttributes]
    );

    /* Returns attribute names from database */
    const {
        records: attributesByCategory = []
    } = useCommonList(
        "attributes",
        {
            whereClause: {
                _id: {
                    $in: attributeIds
                }
            },
            select: {
                name: 1
            }
        }
    );

    /* attributeId : attributename */
    const attributeNameMap = useMemo(() => createAttributeMap(attributesByCategory),[attributesByCategory]);


    /*Get colors */
    const { records: colors = [] } = useCommonList(
        "colors",
        {
            select: {
                hex: 1,
                color: 1
            }
        }
    );


    /* Create color map */
    /* format : { red: { color: "red", hex: "#ff0000" } }
    */

    const colorMap = useMemo(() => {
        const map = {};
        colors.forEach(color => {
            const cleanColor = color?.color?.replace(/"/g, "");
            if (cleanColor) {
                map[cleanColor] = color;
            }
        });
        return map;
    }, [colors]);


    /* Set default variant to select image from color images array */
    /* 
     * variants[0]
     * {
     *    attributes: [
     *       { attributeId: "sizeId", value: "M" },
     *       { attributeId: "colorId", value: "red" }
     *    ]
     * }
     */

    useEffect(() => {

        if (!variantDetails.length) {
            return;
        }
        const defaultVariant = variantDetails[0];

        setSelectedAttributes(
            defaultVariant.attributes.map(attribute => ({
                attributeId: attribute.attributeId,
                value: attribute.value
            }))
        );
        const defaultColor =
            defaultVariant.attributes.find(attribute => {
                const attributeName = attributeNameMap[attribute.attributeId];
                return (
                    attributeName?.toLowerCase() === "color"
                );

            });

        if (defaultColor) {
            setSelectedColor(defaultColor.value);
        }
    }, [
        variantDetails,
        attributeNameMap,
        setSelectedColor
    ]);

    const handleColor = (color) => {
        setSelectedColor(color);
    };
    


    /* Handle any variant attribute - eg - color, size,ram, storage rtc.*/

    const handleVariant = (attributeId, value) => {
        setSelectedAttributes(prev => {
            /*Remove attribute which was already in selected attribute */
            const filtered = prev.filter(
                item => item.attributeId !== attributeId
            );

            return [
                ...filtered,
                {
                    attributeId,
                    value
                }
            ];

        });

    };

    const productVariants = useMemo(() => {
        if (
            !selectedAttributesByUser.length ||
            !variantDetails.length
        ) {
            return null;
        }

        return variantDetails.find(variant => {
            if (
                variant?.attributes?.length !== selectedAttributesByUser.length
            ) {
                return false;
            }
            return selectedAttributesByUser.every(
                selected => {
                    return variant.attributes.some(
                        attribute =>
                            attribute.attributeId === selected.attributeId &&
                            attribute.value === selected.value
                    );

                }
            );

        });

    }, [
        selectedAttributesByUser,
        variantDetails
    ]);

    /*Selcted variant price */
    const sku = productVariants?.sku ?? "";
    const priceValue =  productVariants?.price || 0;
    return (
        <div className={LayoutCss.productInfoWrapper}>
            <div className={LayoutCss.productInfoDetail}>
                {/* Brand */}
                <div className={LayoutCss.brand}>
                    {product?.brandSlug?.toUpperCase()}
                </div>

                {/* Product name */}
                <div className={LayoutCss.title}>
                    {product?.name}
                </div>

                {/* Price */}
                <div className={LayoutCss.price}>
                    ₹{priceValue}
                </div>

                {/* MRP / Discount */}
                <div className={LayoutCss.mrpDiscount}>
                    <span>
                        MRP ₹{product?.actualPrice}
                    </span>
                    <span>
                        ({product?.discount}% OFF)
                    </span>
                </div>
                { console.log("addedAttributes ", addedAttributes)}
                {/* Attributes */}
                <div className="variants-group">
                    {addedAttributes.map((attr, index) => {
                        const attributeName = attributeNameMap[ attr.attributeId ];
                        const isColor = attributeName ?.toLowerCase() ==="color";
                        return (
                            <div className={ LayoutCss.attributeGroup } key={attr.attributeId}>
                                {/* Attribute name */}
                                <div className={ LayoutCss.attributeName } >
                                    Select {attributeName}
                                </div>
                                {/* Attribute values */}
                                <div className={ LayoutCss.attributeValuesGroup }>
                                    {attr.values.map(value => {
                                    const isSelected = selectedAttributesByUser.some(
                                        item => item.attributeId === attr.attributeId && item.value === value
                                    );
                                    if (isColor) {
                                        const colorData = colorMap[value];
                                        if (!colorData) {
                                            return null;
                                        }
                                        return (
                                            <div
                                                key={value}
                                                className={`${LayoutCss.attributeValue} ${
                                                selectedColor === value
                                                    ? LayoutCss.active
                                                    : ""
                                                }`}
                                                style={{
                                                backgroundColor: colorData.hex,
                                                }}
                                                onClick={
                                                () => { 
                                                    handleColor(value),
                                                    handleVariant(attr.attributeId, value)
                                                }
                                                }
                                            >
                                                <div className={LayoutCss.colorCircle}></div>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div
                                            key={value}
                                            className={`${LayoutCss.attributeValue} ${ isSelected ? LayoutCss.active : ""}`}
                                            onClick={() => {
                                                    handleVariant(  attr.attributeId, value)
                                                }
                                            }
                                        >
                                            {value}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* Buttons */}
            <div className={LayoutCss.pdBtnGroup}>
                <AddToCart
                    productId={product?._id}
                    color={selectedColor}
                    selectedVariants={selectedAttributesByUser}
                    productVariants={productVariants}
                    sku={sku}
                />
                <div className={`${LayoutCss.wishlistBtn}${LayoutCss.dtlBtn}`} >
                    <button>
                        SAVE TO WISHLIST
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
}