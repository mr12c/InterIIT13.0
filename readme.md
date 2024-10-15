
# 🚀 Godown Mangament

A product built in react+vite ,mongodb,mongoose,jwt,express,react-dnd

---

## 📦 Cloning the Repository

To get started, clone the repository using the following commands:

1. Open your terminal and run:
   ```bash
   git clone https://github.com/mr12c/InterIIT13.0.git

## 💻 Running the Frontend
To run the frontend, make sure docker is installed in you system if not then download it first 

1. Navigate to the frontend

    ```bash
    cd Frontend
    ```
2. Build the docker image 
   ```bash
   docker build -t app .
3. Run the Image
   ```bash 
   docker run -p 5173:5173 app

## 💿 Running the Backend

1. Navigate to the Server

    ```bash
    cd Server
    ```

2. Create a .env file:

    - Create a .env file based on the provided .envsample. You can do this by copying the .envsample file:

    ```bash
    cp .envsample .env
    ```
2. Build the docker image
   ```bash
   docker build -t serverApp .
   ```

3. Run the Image
   ```bash 
   docker run --env-file .env -p 5000:5000 serverApp
   ```

 

## 🔑 Login Credentials
   Use the following credentials to log into the app:

  - Email: vishal@gmail.com
  - Password: vishal123


## 💡 Thought Process Behind Building This Project

1. Solution Approach
   - Planning:

        Before starting, I sketched a clear outline of how the frontend and backend would interact. This included choosing React for the frontend and Node.js/Express for the backend to handle API requests.

    - Frontend:

       For the frontend, I chose React + Vite because I’m very familiar with this stack. Vite offers faster development and build times, making the development process much more efficient. For styling, I went with Tailwind CSS, as it helps prevent design overrides and reduces the hassle of switching between JSX components and CSS files. Tailwind's utility-first approach also streamlined the overall design process..
    - Data formating
       The main challenge I faced was converting the raw data into the required format for the project. I opted for MongoDB as the database and used MongoDB Cloud Atlas to store collections like item and  godown. MongoDB's aggregation pipelines were essential in transforming the data into the desired structure, which I then utilized to display a tree view of godowns, subgodowns, and items.

    - Building the Tree Structure

      Creating a tree-like structure for godown, subgodown, and item components was tricky. Initially, I rendered the Godown component recursively within itself to test the setup. However, this approach led to the website becoming unresponsive due to infinite rendering.

        I consulted ChatGPT, and it helped me identify the issue—an infinite recursion. To resolve this, I used a strategy similar to recursion in programming. I introduced a depth prop that would serve as a base case for stopping the recursion. For each recursive pass, I incremented the depth value and applied a condition: if depth < 6, render the next level. This technique allowed me to successfully create the tree structure without performance issues.
        ```bash
              <Godown depth={0} godownData={data} onItemDrop={handleDrop} />
        ```
    - Displaying and Filtering Items

      Once the tree structure was in place, displaying items and adding click functionality was straightforward. Searching for items based on type, price, and name required building additional routes in the backend to handle the queries effectively

    - Authentication and Token Management

      For authentication, I implemented JSON Web Tokens (JWT). I used two tokens: an access token and a refresh token. The access token has a short lifespan, while the refresh token is long-lived and stored in the database. When the access token expires, the refresh token is used to generate a new one, ensuring secure and seamless user authentication.

    