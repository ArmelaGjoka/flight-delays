

# DESCRIPTION

Flight Delays application is set up as a monorepo by using Nx MonoRepo. There are three building blocks: 

- Frontend Application created with Angular Framework. Main libraries we have used are: Angular Material, ag-grid for grid visualization and vega grammar for creating and updating charts. 
- Backend Application created with NestJS Framework. Here we are connecting to the sqlite database to get the historical data for flights and corona values for each state.  
- Prediction Application created with Flask Framework. Here we are sending requests and expecting to get a prediction of delay for the specified input variables.
Frontend application is sending requests to both Backend and Prediction applications through HTTP requests.

Following Python scripts are used to generate modelling results and are located in flight-delays/predict-api/src/ folder:
- data_prep_expl.py: for data exploration
- RF_airport id feature analysis.py: for origin and destination airport feature importance analysis
- RF_main analysis: for other feature importance, dummy regressor and Random Forest regressor analysis
- Voting regressor.py: for voting regressor analysis
- utils.py: contains supporting functions
All modelling results described in the report can be found in the results folder.

- Toy data for a demo is included as flights.db. 
- Complete dataset can be downloaded via this link: https://drive.google.com/file/d/186fBgTf4y9rNfF5YS32iSc30_lep3gow/view?usp=sharing

# INSTALLATION

1. Save flight-delays repository on your local machine, note the folder path
2. Download and install NodeJS version 14.17.0 (https://nodejs.org/download/release/v14.17.0/)
3. Open Anaconda prompt. If you don't have Anaconda, first download it from https://www.anaconda.com/ and install. Alternatively, steps below can be done from Visual Studio or command prompt.
4. In Anaconda prompt, create and activate new virtual enviroment by executing: 
	a. conda create --name [env_name] 
	b. activate [env_name]
5. Navigate to [your-flight-delays-app-path]/apps/predict-api/src and set 2 environment variables:
	a. Set path: set FLASK_PATH=app.py
	b. Set app: set FLASK_APP=app.py
6. Navigate back to [your-flight-delays-app-path] and install required Python packages listed in requirements.txt file by executing: conda install -c conda-forge --file requirements.txt
	Make sure your virtual environment [env_name] is activated.
7. Install npm by executing: npm install  
8. Install sqlite dependency: npm install sqlite3 	

# EXECUTION

After dependencies are installed run in parallel the commands below, i.e, open 3 Anaconda prompt terminals and run one command listed below in each terminal window. Make sure your virtual environment [env_name] is activated in each terminal window and that the path navigates to [your-flight-delays-app-path].

1. npm run start:flights
2. npm run start:flights-api
3. npm run start:predict-api

Navigate to localhost:4200 and you should see the app.

# An example scenario to run:

1. Select Fort Lauderdale-Hollywood International as origin airport (FROM) and Denver International as destination airport (TO)
2. Upon selection, the following is displayed:
	a. "Average Delay -0.79 mins" is displayed above the map
	b. Selected airports are connected in the map
	c. In the predict form, departure delay and distance are pre-populated: departure delay as an average historic departure delay (8.211 min) and distance according to the data from the database (1703 km). These variables can remain as such or you can alter them if you like.
3. Enter the remaining input variables in the Machine Learning Predict form
	a. Departure hour: try first 78 - you should get a message that the hour should be between 0 and 23. Now enter 10.
	b. Departure day of week: select Friday.
	c. Departure month: select February.
	d. Corona related variables: select 0.15% and 0.1% for cases origin and destination, respectively. Select 50% and 20% for increase origin and destination, respectively. 
	e. Airline: select Southwest Airlines Co.
4. Click Predict button
5. Arrival delay predicted via Machine Learning model should be displayed on the top of the Machine Learning Predict form: "Predicted Delay is -1.04 mins" (for the input parameters specified above)
6. Now switch to Historical Data tab. 
	a. You will see 19 distinct flights from Fort Lauderdale-Hollywood International to Denver International displayed along with a lot of supporting data. You can check / uncheck boxes in the panel on the right to select which columns will be displayed. You can also drag a column into Row Groups panel to group the data.
	b. To see aggregated values, switch on Pivot Mode. Here you can also group the data by dragging a column into Row Groups panel. You can also update the type of aggregation function in the Values panel.

 
- Link to the DEMO video that shows how to install and run the application: https://www.youtube.com/watch?v=iBa5wnhtvw8