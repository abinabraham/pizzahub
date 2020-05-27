import React, { Component } from 'react'
import {storeProducts,detailProduct} from './data'
import axios from 'axios';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state={
        products:[] ,
        detailProduct: [],
        cart:[],
        modalOpen:false,
        modalProduct:detailProduct,
        cartSubtotal: 0,
        cartTax: 0,
        cartTotal: 0,
        vegProducts:[],
        nonVegProducts:[]

    }  
    componentDidMount(){
        this.setProducts();
    }
    // componentDidMount() {
    //     axios.get(`http://localhost:8009/api/items/`)
    //       .then(res => {
    //         const products = res.data;
    //         console.log(products,"pppppppppppp");
    //         this.setState({ products });
    //       })
    //   }

    setProducts = () => {
        let tempProducts = [];
        axios.get(`http://localhost:8009/api/items/`)
          .then(res => {
            const products = res.data;
            products.forEach(item=>{
                const singleItem = {...item};
                tempProducts = [...tempProducts, singleItem];
            });
            this.setState(() => {
    
                return { products: tempProducts, detailProduct:tempProducts};
            });
            
          })

          

          let tempvegProducts = [];
          axios.get(`http://localhost:8009/api/pizza/V`)
          .then(res => {
            const products = res.data;
            products.forEach(item=>{
                const singleItem = {...item};
                tempvegProducts = [...tempvegProducts, singleItem];
            });
            this.setState(() => {
    
                return {vegProducts:tempvegProducts};
            });
            
          })

          let tempNvegProducts = [];
          axios.get(`http://localhost:8009/api/pizza/NV`)
          .then(res => {
            const products = res.data;
            products.forEach(item=>{
                const singleItem = {...item};
                tempNvegProducts = [...tempNvegProducts, singleItem];
            });
            this.setState(() => {
    
                return {nonVegProducts:tempNvegProducts};
            });
            
          })

        
    };
    
    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product
    }

    handledetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct:product}
        })
    };
    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index =  tempProducts.indexOf(this.getItem(id));
        const product =  tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(
            () => {
            return { products: tempProducts,cart:[...this.state.cart,
                product] };
            
        },
        () => {
            this.addTotals();
            
        },
        
        
        );

    };

    openModal = id =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {modalProduct:product, modalOpen:true}
        })
    };
    closeModal = () =>{
        this.setState(()=>{
            return {modalOpen:false}
        })
    };

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedproduct = tempCart.find(item=>item.id === id);

        const index = tempCart.indexOf(selectedproduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(() => {
            return{
                cart:[...tempCart]
            }
        },
        ()=>{
             this.addTotals();
         }
        )

    };

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedproduct = tempCart.find(item=>item.id === id);

        const index = tempCart.indexOf(selectedproduct);
        const product = tempCart[index];

        product.count = product.count - 1;

        if(product.count === 0){
            this.removeItem(id);
        }else{
            product.total = product.count * product.price;
            this.setState(() => {
                return{
                    cart:[...tempCart]
                }
            },
            ()=>{
                 this.addTotals();
             }
            )
    
        }


    };
    removeItem = id => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(()=>{
            return{
                cart:[...tempCart],
                products:[...tempProducts]
            };
       },
        () => {
            this.addTotals();
            
        },);

    };

    clearCart = () => {
        this.setState( () => {
                return { cart:[]};
            },
            () => {
                this.setProducts();
            }
        )
    }

    addTotals = () => {
        console.log("totals added");
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(()=>{
            return ({
                cartSubtotal:subTotal,
                cartTax:tax,
                cartTotal:total
            }
                

            )
        })
    }
    // tester = () => {
    //     console.log("State Products",this.state.products[0].inCart);
    //     console.log("Data Products",storeProducts[0].inCart);

    //     const tempProducts = [...this.state.products];
    //     tempProducts[0].inCart = true;

    //     this.setState(()=>{
    //         return {product:tempProducts}
    //     },()=>{
    //         console.log("State Products",this.state.products[0].inCart);
    //         console.log("Data Products",storeProducts[0].inCart);
    //     })

    // }
    render() {
        return (
            <ProductContext.Provider
             value={{
                 ...this.state,
                 handledetail: this.handledetail,
                 addToCart: this.addToCart,
                 openModal: this.openModal,
                 closeModal: this.closeModal,
                 increment: this.increment,
                 decrement: this.decrement,
                 removeItem: this.removeItem,
                 clearCart: this.clearCart
                 }}
                 >

                 {this.props.children}

            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider,ProductConsumer };