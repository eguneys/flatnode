export type NoSpaceId = string

// "NoSpaceId NoSpaceId NoSpaceId"
export type Path = string

export type FNode<A> = {
  id: NoSpaceId,
  data: A,
  children: Array<FNode<A>>
}


export function path_split(path: Path) {
  let res = path.split(' ')
  return [res.slice(0, 1).join(''), res.slice(1).join(' ')]
}


export function make_fnode<A>(id: NoSpaceId, data: A): FNode<A> {
  return {
    id,
    data,
    children: []
  }
}

export function fnode_add_node<A>(node: FNode<A>, child: FNode<A>) {
  node.children.push(child)
  return node
}

export function fnode_add_nodes<A>(node: FNode<A>, ...children: Array<FNode<A>>) {
  children.forEach(_ => node.children.push(_))
  return node
}

export function fnode_update_children<A>(node: FNode<A>, id: NoSpaceId, fn: (_: FNode<A>) => void) {
  node.children.filter(_ => _.id === id).forEach(fn)
}

export function fnode_add_node_at<A>(node: FNode<A>, path: Path, child: FNode<A>) {
  let [head, tail] = path_split(path)

  if (head === '') {
    fnode_add_node(node, child)
  } else {
    fnode_update_children(node, head, _ => fnode_add_node_at(_, tail, child))
  }
}

export const fid = (_: any) => _

/*
https://github.com/substack/node-archy
'│' : '|'
'└' : '`'
'├' : '+'
'─' : '-'
'┬' : '-'


beep
├── ity
└─┬ boop
  ├─┬ o_O
  │ ├─┬ oh
  │ │ ├── hello
  │ │ └── puny
  │ └── human
  └── party
      time!
*/
export function fnode_pretty<A>(node: FNode<A>, fna: (a: A) => string = fid) {

  function helper(prefix: string, node: FNode<A>): string {
    let label = node.id + ' ' + fna(node.data)

    let nodes = node.children
    return prefix + label + '\n' +
      nodes.map((node, i) => {
        let last = i === nodes.length - 1
        let more = node.children.length > 0
        let _prefix = prefix + (last ? ' ' : '│') + ' '

        return prefix +
          (last ? '└' : '├') + '─' +
          (more ? '┬' : '─') + ' ' +
          helper(_prefix, node).slice(prefix.length + 2)
      }).join('')

  }
  return helper('', node)
}

export function fnode_flat<A>(node: FNode<A>, fna: (a: A) => string = fid) {
  return ''
}
