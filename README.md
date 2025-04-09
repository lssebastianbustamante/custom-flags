# Custom Flags
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

This app provides collections card, the app assigns specific colors to the flag depending of the type of the flag and configuration of promotions the store

## Configuration

1. Add the `custom-flags` to product summary

```json
  "flex-layout.col#product-card": {
    "children": [
      "custom-flags",
    ],
    "props": {
      "blockClass": "product-card"
    }
  },
  "custom-flags": {
    "props": {
      "discountColor": "#a52323",
      "volumetricColor": "#2d6eaa",
      "moreForLessColor": "#e18719",
      "collectionColor": "#4f2170",
      "productGiftColor": "#623e23",
      "comboColor": "#e6af23"
    }
  },
```

2. Add tow blocks `custom-order-form#mimicart` and `custom-flags-with-product-list#minicart` in file `minicart.json`

```json
  "minicart-base-content": {
    "blocks": ["minicart-empty-state"],
    "children": [
      "custom-order-form#mimicart",
      "flex-layout.row#minicart-footer"
    ]
  },
  "custom-order-form#mimicart": {
    "children": ["minicart-product-list"]
  },
  ---
  "flex-layout.col#name-and-display": {
    "children": [
      "custom-flags-with-product-list#minicart"
    ],
    "props": {
      "blockClass": "name-and-display",
      "width": "grow"
    }
  },
  "custom-flags-with-product-list#minicart": {
    "props": {
      "discountColor": "#a52323",
      "volumetricColor": "#2d6eaa",
      "moreForLessColor": "#e18719",
      "collectionColor": "#4f2170",
      "productGiftColor": "#623e23",
      "comboColor": "#e6af23"
    }
  },
```

# Props component

| Prop name          | type     | Description                    | Default Value   |
| ------------------ | -------- | ------------------------------ | --------------- |
| `discountColor`    | `string` | color value hexadecimal type   | `#a52323`       |
| `volumetricColor`  | `string` | color value hexadecimal type   | `#2d6eaa`       |
| `moreForLessColor` | `string` | color value hexadecimal type   | `#e18719`       |
| `collectionColor`  | `string` | color value hexadecimal type   | `#4f2170`       |
| `productGiftColor` | `string` | color value hexadecimal type   | `#623e23`       |
| `comboColor`       | `string` | color value hexadecimal type   | `#e6af23`       |


## Customization

| CSS Handles               |
| ------------------------- |
| `custom-flags__container` |
| `custom-flags__tag`       |
| `custom-flags__floating`  |

## New Features

### Feature Summary

- Implementation of a modal to display information about promotions.
- Refactored code for simpler management of components and easier understanding for new feature implementation.

### Implementation Details

#### Custom Modal

Implemented a custom modal with CSS handles to manipulate its properties.

| New Components                                      |
| --------------------------------------------------- |
| `custom-flags__floating-container-for-collection`  |
| `custom-flags__floating-container-for-discount`    |
| `custom-flags__floating-container-for-moreless`     |
| `custom-flags__floating-container-for-combo`       |
| `custom-flags__floating-container-for-productGif`   |
| `custom-flags__floating-container-for-volumetric`   |
| `custom-flags__promotion-data-title`                |
| `custom-flags__promotion-data-subtitle`             |
| `custom-flags__promotion-data-message`              |
| `custom-flags__list-title-productgift`              |
| `custom-flags__container-table-volumetric`         |
| `custom-flags__container-list-gifts-product`        |
| `custom-flags__tag`                                 |
| `custom-flags__tag-modal`                           |
| `custom-flags__container-data-flag`                 |

| For Modal                                           |
| --------------------------------------------------- |
| `custom-flags__container-modal`                     |
| `custom-flags__close-button-modal`                  |
| `custom-flags__body-modal`                          |
| `custom-flags__close-button-modal-icon`             |

## Configuration

Configuration can be done via App Settings:

[App Settings URL](https://{ws}--{vendor}.myvtex.com/admin/apps)

| Configuracion via App settings                      |
| --------------------------------------------------- |
| `activateAutoClose - boolean - default value: false`|
| `clickOverlay - boolean - default value: true`      |
| `timeAutoClose - number - default value: 0`         |
