export type TwoCharId = string

// "TwoCharIdTwoCharId"
export type Path = string

export type FNode<A> = {
  id: TwoCharId,
  data: A,
  children: Array<FNode<A>>
}

export function path_head(path: Path) {
  return path.slice(0, 2)
}

export function path_tail(path: Path) {
  return path.slice(2)
}


export function make_fnode<A>(id: TwoCharId, data: A): FNode<A> {
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

export function fnode_at_path<A>(node: FNode<A>, path: Path): FNode<A> | undefined {
  if (path === '') return node
  let child = node.children.find(_ => _.id === path_head(path))
  return child ? fnode_at_path(child, path_tail(path)) : undefined
}

export function fnode_update_at<A>(node: FNode<A>, path: Path, fn: (_: FNode<A>) => void) {
  let _node = fnode_at_path(node, path)
  if (_node) {
    fn(_node)
    return _node
  }
  return
}

export function fnode_add_node_at<A>(node: FNode<A>, path: Path, child: FNode<A>) {
  let newPath = path + node.id
  fnode_update_at(node, path, _ => _.children.push(child))
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

