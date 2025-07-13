 Crypto Tracker - MERN Stack Application

A real-time cryptocurrency tracker built with the MERN stack. This app fetches live coin data, displays market trends, allows filtering/sorting/searching, and updates data automatically using a backend cron job.


MERN STack
Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- Chart.js
- Sonner (notifications)
- Material ui icons
- shadcn BUTTON

Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- Axios (to fetch data from CoinGecko API)
- Node Cron (for scheduled data updates)
- JSON Web Token (JWT) for authentication
- CORS

setup and installation steps

first of all i build the main pages of the vite create@latest  frontend (client) then build server backend created routes,controller,models,auth middlware


then pushed full project on my github reposatary , then deployed frontend on Netlify , Backend on Render


after recieving the backend and frontend urls ,,i updated the environment variable of frontend so that it can move to correct apis,,then in
backend i updated the app.js file mentioned the cors  ..then redeploy the project ..



CRON JOBS in my project ,, cron job sechdule in interval of 1,2,3 like this no of hours ,,it directly get data from the api of top currencies 
then independently update the mongo database by its atlas url present in the ENV file.


 Frontend: https://cryptoclient10.netlify.app

 Backend: https://crypto-0xjt.onrender.com
