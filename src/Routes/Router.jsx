import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Layouts/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PetListing from "../Pages/PetListing";
import PetDetails from "../Pages/PetDetails";
import DonationCampaigns from "../Pages/DonationCampaigns";
import DonationDetails from "../Pages/DonationDetails";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivateRoute from "../Pages/PrivateRoute";
import MyCampaigns from "../Pages/MyCampaigns";
import CreateCampaign from "../Pages/CreateCampaign";
import AddPet from "../Pages/AddPet";
import MyAddedPets from "../Pages/MyAddedPets";
import Update from "../Pages/Update";
import UpdateDonation from "../Pages/UpdateDonation";

 export const router = createBrowserRouter([
  {
    path: "/",
    Component : MainLayout,
    children : [
        {index: true , Component: Home},
        {path:'login', Component: Login},
        {path: 'register', Component:Register},
        {path: '/petListing', Component: PetListing},
        {path : '/petListing/:id', Component:PetDetails},
        {path:'/DonationCampaigns', Component:DonationCampaigns},
        {path:'/DonationCampaigns/:id' , Component:DonationDetails},
        {path:'/dashboardLayout', Component:DashboardLayout}
    ]
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "myCampaigns", element: <MyCampaigns></MyCampaigns> } ,// ✅ RELATIVE PATH
      {path: "createCampaign", element: <CreateCampaign></CreateCampaign>},
      {path: 'AddPet', element : <AddPet></AddPet>},
      {path:'MyAddedPets', element:<MyAddedPets></MyAddedPets>},
      {path:'update/:id', element : <Update></Update>} ,
      { path: "update-campaign/:id", element: <UpdateDonation></UpdateDonation>}
    ]
  }
]);