
export const calExpirydate = async(memberShipPlan) =>{
    if(memberShipPlan === 'monthly'){
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        return expiryDate;
    } else if (memberShipPlan == 'quarterly'){
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 3);
        return expiryDate;
    } else if (memberShipPlan == 'yearly'){
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        return expiryDate;
    }
}