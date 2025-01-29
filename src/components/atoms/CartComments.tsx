import type {ChangeEvent} from "react";

const CartCommentsComponent=({comment,setComment}: {comment: string; setComment: (comment: string) => void}) => (
    <div className="mt-4 ">
        <textarea value={comment} onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => setComment(e.target.value)} className="w-full outline-none p-2 border border-brown rounded bg-transparent" placeholder="Informacion adicional sobre el pedido" />
    </div>
);

export default CartCommentsComponent;
