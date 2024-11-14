# To-Do Mobile App

This is a simple cross-platform To-Do app built with React Native and Expo.

## Requirements

- **Node.js**: Ensure Node.js is installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).


## Getting Started

1. **Clone the Repository**:

   ```bash
   git clone https://gitlab.com/ntmebane/to-do-mobile-app.git
   cd to-do-mobile-app
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the App**:

   - Start the Expo development server using:

    ```bash
    npx expo start
    ```

4. **Testing the App**:

   - **Using an Emulator**: You can run the app on an Android or iOS emulator directly through the Expo server.
   - **Using a Physical Device**: Scan the QR code with the Expo Go app on your mobile device. 
     - **Note**: Expo Go must be installed on your mobile device for this option.

## Features

- **Add New Items**: Add items with a name and description.
- **Edit and Delete Items**: Modify or delete items in the list.
- **Persistent Storage**: The item list is stored locally using AsyncStorage.
- **Responsive UI**: Basic styling and layout for a clean user interface.

## Notes

- Make sure to use the Expo Go app to scan the QR code for a seamless testing experience.
- This project is designed to be cross-platform and works on both iOS and Android devices.