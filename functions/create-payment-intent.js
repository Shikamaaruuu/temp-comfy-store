require('dotenv').config()

const stripe  =  require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)
exports.handler = async function (event, context) {
    if(event.body){

        const {cart,shipping_fee,total_amount} = JSON.parse(event.body)
        //In production cases we pass the ids to the backend to calculate total cost and all to avoid malicious attacks

        const calc = ()=>{
            return shipping_fee+total_amount
        }
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount:calc(),
                currency:'inr'
            })
            return {
                statusCode:200,
                body:JSON.stringify({clientSecret:paymentIntent.client_secret})
            }
        } catch (error) {
            return {
                statusCode:500,
                body:JSON.stringify({msg:error.message})
            }
        }
        return {
            
            statusCode: 200,
            body: JSON.stringify(cart),
        }
}

    // In the browser this will run bcz we are performing a get request
    return {
        statusCode:200,
        body:'Create Payment Intent'
    }

};
