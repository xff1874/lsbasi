BEGIN
    BEGIN
        number := 2;
        a := number;
        b := 10 * a + 10 * number / 4;
        c := a - - b
    END;
    x := 11;
END.

program -> BEGIN compoundst END dot
compoundst:  BEGIN stlist END//这里为什么不用st(st)*

stlist: st | st semi stlist

st: assignst| compoundst|empty。
assignst: variable  assign expr;
variable: ID,

factor: PLUS factor | MINUS factor;