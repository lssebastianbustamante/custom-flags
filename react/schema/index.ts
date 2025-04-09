export const schema = {
  title: 'Flags/Cucardas personalizadas',
  type: 'object',
  properties: {
    enableFlagsModal: {
      title: 'Activar modal de flags informativo',
      type: 'boolean',
      description: 'Habilitar modal informativo al hacer click sobre los flags'
    },
    enableInfoPdp: {
      title: 'Activar el bloque informativo en pdp',
      type: 'boolean',
      description: 'Habilitar bloque informativo al hacer click sobre los flags'
    },
    activateAutoClose: {
      title: 'Activar auto cierre de modal',
      type: 'boolean',
      description:
        'Activando esta funcionalidad se ejecuta el auto cierre de modal'
    },
    showLimitPromotions: {
      title: 'Mostrar bloque de limites para promociones',
      type: 'boolean',
      description:
        'Activando esta funcionalidad se mostrara los limites de las promociones'
    },
    clickOverlay: {
      title: 'Cerrar modal al hacer click fuera de el',
      type: 'boolean',
      description:
        'Activando esta funcionalidad se cerrara el modal al hacer click fuera de el',
      default: true
    },
    timeAutoClose: {
      title: 'Tiempo de auto cierre de modal',
      type: 'number',
      minimum: 1,
      description: 'Introduce un valor en (ms) ej: 1000 = 1s',
      default: 5000
    },
    discountColor: {
      title: 'Color de fondo de las promociones regulares',
      type: 'string',
      widget: {
        'ui:widget': 'color'
      }
    },
    volumetricColor: {
      title: 'Color de fondo de las promociones de descuento progresivo',
      type: 'string',
      widget: {
        'ui:widget': 'color'
      }
    },
    moreForLessColor: {
      title: 'Color de fondo de las promociones más por menos',
      type: 'string',
      widget: {
        'ui:widget': 'color'
      }
    },
    collectionColor: {
      title: 'Color de fondo de las colecciones',
      type: 'string',
      widget: {
        'ui:widget': 'color'
      }
    },
    productGiftColor: {
      title: 'Color de fondo de producto regalo',
      type: 'string',
      widget: {
        'ui:widget': 'color'
      }
    },
    comboColor: {
      title: 'Color de fondo de combos',
      type: 'string',
      widget: {
        'ui:widget': 'color'
      }
    },
    colorsColeccions: {
      title: 'Colores de las colecciones especificas',
      description: 'Agrega colores con sus respectivas identificaciones',
      type: 'array',
      items: {
        properties: {
          nameSeleccion: {
            title: 'Nombre de coleccion',
            type: 'string',
            default: ''
          },
          colorSeleccion: {
            title: 'color',
            type: 'string',
            default: '',
            widget: {
              'ui:widget': 'color'
            }
          },
          typeSeleccionFlag: {
            title: 'Estilo del flag',
            type: 'string',
            enum: ['normal', 'estilo-1'],
            enumNames: ['Normal', 'Estilo 1'],
            default: 'normal'
          }
        }
      }
    }
  }
}

export default schema
