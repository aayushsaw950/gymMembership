import Membership from "../../models/Membership.js";   
import { calExpiryDate } from "../../utils/calculateExpiryDate.js";     

export const assignNewMembership = async (req , res) =>{
    const {userId , membershipPlan , payment, paymentMode}  = req.body;

    try{
        const newMembership = new Membership({
            userId,
            membershipPlan,
            startDate: new Date(),
            expiryDate: calExpiryDate(membershipPlan),
            status: 'active',
            payment,
            paymentMode
        });

        await newMembership.save();
        res.status(201).json({message: 'Membership assigned successfully', membership: newMembership});
    } catch(error){
        res.status(500).json({message: 'Error assigning membership', error: error.message});
    }
}

export const updateMembership = async (req, res) => {
      const {membershipId, membershipPlan, payment, paymentMode} = req.body;
      
      try{
         const membership = await Membership.findByIdandUpdate(membershipId, {
            membershipPlan,
            expiryDate: calExpiryDate(membershipPlan),
            payment,
            paymentMode
         }, {new: true});
         res.status(200).json({message: 'Membership updated successfully', membership});
      } catch(error){
         res.status(500).json({message: 'Error updating membership', error: error.message});
      }
}

export const changeMembership = async (req, res) => {
      const {userId, membershipPlan, payment, paymentMode} = req.body;
      const activeMembership = await Membership.findOne({userId, status: 'active'});

      try{
        if(activeMembership){
            activeMembership.status = 'expired';
            await activeMembership.save();
        }
        const newMembership = new Membership({
            userId,
            membershipPlan,
            startDate: new Date(),  
            expiryDate: calExpiryDate(membershipPlan),
            status: 'active',
            payment,
            paymentMode,
        })
        await newMembership.save();
        res.status(201).json({message: 'Membership changed successfully', membership: newMembership});
      } catch(error){
        res.status(500).json({message: 'Error changing membership', error: error.message});
      }
};