import { useEffect, useState } from "react";
import { getProduct } from "../../api/productAPI";


const initState = {
  pno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  images: []
}

const ReadComponent = ({ pno, moveModify, moveList }) => {

  const [product, setProduct] = useState(initState)

  useEffect(() => {

    getProduct(pno).then(data => {
      setProduct(data)
    })

  }, [pno])

  return (
    <div>
      <div className="m-2 p-2 text-white">
        <div className="m-2 p-2 border-2">
          {product.pname}
        </div>
        <div className="m-2 p-2 border-2">
          {product.pdesc}
        </div>
        <div className="m-2 p-2 border-2">
          {product.price}
        </div>
        <div className="m-2 p-2 border-2">
          <ul className="list-none">
            {product.images.map((fname, idx) =>
              <li key={idx}>
                <img src={`http://localhost/${fname}`}></img>
              </li>
            )}
          </ul>
        </div>
        <div>
          <button
            className="bg-orange-500 border-2 m-2 p-2 font-bold"
            onClick={() => moveModify(product.pno)}
          >
            Modify
          </button>
          <button
            className="bg-blue-500 border-2 m-2 p-2 font-bold"
            onClick={moveList}
          >
            List
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReadComponent;