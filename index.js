import G6 from '@antv/g6';

let graph;

const ERROR_COLOR = '#F5222D';
const getNodeConfig = node => {
  if (node.nodeError) {
    return {
      basicColor: ERROR_COLOR,
      fontColor: '#FFF',
      borderColor: ERROR_COLOR,
      bgColor: '#E66A6C'
    };
  }
  let config = {
    basicColor: '#5B8FF9',
    fontColor: '#5B8FF9',
    borderColor: '#5B8FF9',
    bgColor: '#C6E5FF'
  };
  return config;
};

const nodeBasicMethod = {
  createNodeBox: (group, config, w, h, isRoot) => {
    /* 最外面的大矩形 */
    const container = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: w,
        heigh: h
      },
      name: 'big-rect-shape'
    });

    /* 矩形 */
    group.addShape('rect', {
      attrs: {
        x: 3,
        y: 0,
        width: w - 19,
        height: h,
        fill: config.bgColor,
        stroke: config.borderColor,
        radius: 2,
        cursor: 'pointer'
      },
      name: 'rect-shape'
    });

    return container;
  }
};

G6.registerNode('card-node', {
  draw: (cfg, group) => {
    const config = getNodeConfig(cfg);
    const nodeError = cfg.nodeError;
    /* the biggest rect */
    const container = nodeBasicMethod.createNodeBox(group, config, 243, 64);

    /* name */
    group.addShape('text', {
      attrs: {
        text: cfg.name,
        x: 19,
        y: 19,
        fontSize: 14,
        fontWeight: 700,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: config.fontColor,
        cursor: 'pointer'
      },
      name: 'name-text-shape'
    });

    /* the description text */
    group.addShape('text', {
      attrs: {
        text: cfg.total,
        x: 19,
        y: 45,
        fontSize: 14,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: config.fontColor,
        cursor: 'pointer'
      },
      name: 'bottom-text-shape'
    });
    group.addShape('text', {
      attrs: {
        text: 'Total',
        x: 19,
        y: 60,
        fontSize: 14,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: config.fontColor,
        cursor: 'pointer'
      },
      name: 'bottom-text-shape'
    });

    /* the description text */
    group.addShape('text', {
      attrs: {
        text: cfg.self,
        x: 180,
        y: 45,
        fontSize: 14,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: config.fontColor,
        cursor: 'pointer'
      },
      name: 'bottom-text-shape'
    });
    group.addShape('text', {
      attrs: {
        text: 'SELF',
        x: 180,
        y: 60,
        fontSize: 14,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: config.fontColor,
        cursor: 'pointer'
      },
      name: 'bottom-text-shape'
    });
    if (nodeError) {
      group.addShape('text', {
        attrs: {
          x: 180,
          y: 22,
          text: '⚠️',
          fill: '#000',
          fontSize: 18
        },
        name: 'error-text-shape'
      });
    }
    return container;
  }
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
graph = new G6.Graph({
  container: 'container',
  width,
  height,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  modes: {
    default: ['drag-node']
  },
  defaultNode: {
    type: 'card-node'
  }
});

const data = {
  nodes: [
    {
      name: 'func1',
      ip: '127.0.0.1',
      nodeError: true,
      dataType: 'root',
      total: '18%',
      self: '18%',
      x: 100,
      y: 50
    },
    {
      name: 'func2',
      ip: '127.0.0.1',
      nodeError: false,
      dataType: 'subRoot',
      total: '18%',
      self: '18%',
      x: 100,
      y: 150
    },
    {
      name: 'func3',
      ip: '127.0.0.1',
      nodeError: false,
      dataType: 'subRoot',
      self: '18%',
      total: '18%',
      x: 100,
      y: 250
    }
  ],
  edges: []
};

graph.data(data);
graph.render();

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
