## Requisitos obrigatórios

- [x] Deve ser em **React Native CLI** para melhor semelhança ao contexto do projeto da AgendaEdu
- [x] **TypeScript**
- [x] **Custom Hooks**
- [ ] **Redux Saga**
- [x] **React Navigation**
- [x] **Styled Components** ou outra solução de estilização robusta
- [ ] **Testes de Integração** (Jest / React Testing Library)
- [ ] **CI/CD** com Github Actions (Pull Request Test Coverage Report)
- [x] **JSON-Server** para simular API local ou hospedada
- [x] **Performance** (Otimizações em listas, redução de re-renders)
- [x] **Monitoramento** (Firebase Analytics/Crashlytics ou Sentry)

## Requisitos bônus

Esses requisitos não são obrigatórios, mas serão levados em consideração como pontos extras no momento da avaliação.

- [ ] **Storybook** (Documentação de componentes globais)
- [ ] **Testes E2E** (Detox ou Maestro)
- [x] **Microinterações** (Animations, Toast, EmptyState, Loadings)
- [x] **React Query**
- [x] **Personalizações nativas**: Ícone e SplashScreen




https://github.com/user-attachments/assets/d6457994-6f7a-4312-992e-bd619661997d


This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.
