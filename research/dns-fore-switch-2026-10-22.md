# DNS före switch – markishelsingborg.se

Avläst 2026-10-22T07:09Z med `dig +noall +answer` (resolver: systemets). Ordagrant.

### markishelsingborg.se A
```
markishelsingborg.se.	7200	IN	A	91.201.60.166
```

### markishelsingborg.se AAAA
```
markishelsingborg.se.	7200	IN	AAAA	2a02:28f0:3036:69::
```

### markishelsingborg.se MX
```
markishelsingborg.se.	7200	IN	MX	1 mx1.oderland.com.
markishelsingborg.se.	7200	IN	MX	1 mx4.oderland.com.
markishelsingborg.se.	7200	IN	MX	1 mx2.oderland.com.
markishelsingborg.se.	7200	IN	MX	1 mx3.oderland.com.
```

### markishelsingborg.se TXT
```
markishelsingborg.se.	7200	IN	TXT	"v=spf1 ip4:91.201.60.166 +a +mx +include:_vsp.oderland.com ~all"
```

### markishelsingborg.se NS
```
markishelsingborg.se.	7200	IN	NS	dns1.oderland.com.
markishelsingborg.se.	7200	IN	NS	dns2.oderland.com.
markishelsingborg.se.	7200	IN	NS	dns3.oderland.com.
```

### markishelsingborg.se CAA
```
(inget svar)
```

### markishelsingborg.se SOA
```
markishelsingborg.se.	7200	IN	SOA	dns1.oderland.com. registry.oderland.se. 2026101101 3600 7200 1209600 86400
```

### www.markishelsingborg.se A
```
www.markishelsingborg.se. 7200	IN	CNAME	markishelsingborg.se.
markishelsingborg.se.	7200	IN	A	91.201.60.166
```

### www.markishelsingborg.se CNAME
```
www.markishelsingborg.se. 7200	IN	CNAME	markishelsingborg.se.
```

### _dmarc.markishelsingborg.se TXT
```
_dmarc.markishelsingborg.se. 7200 IN	TXT	"v=DMARC1; p=none;"
```

### default._domainkey.markishelsingborg.se TXT
```
(inget svar)
```

### mail._domainkey.markishelsingborg.se TXT
```
(inget svar)
```

### k1._domainkey.markishelsingborg.se TXT
```
(inget svar)
```

### google._domainkey.markishelsingborg.se TXT
```
(inget svar)
```

### s1._domainkey.markishelsingborg.se TXT
```
(inget svar)
```

### s2._domainkey.markishelsingborg.se TXT
```
(inget svar)
```

### selector1._domainkey.markishelsingborg.se TXT
```
(inget svar)
```

### selector2._domainkey.markishelsingborg.se TXT
```
(inget svar)
```

### brevo._domainkey.markishelsingborg.se TXT
```
(inget svar)
```

### mail2._domainkey.markishelsingborg.se TXT
```
(inget svar)
```

### x._domainkey.markishelsingborg.se TXT
```
(inget svar)
```

### autodiscover.markishelsingborg.se CNAME
```
(inget svar)
```

### autodiscover.markishelsingborg.se A
```
(inget svar)
```

### mail.markishelsingborg.se CNAME
```
(inget svar)
```

### mail.markishelsingborg.se A
```
mail.markishelsingborg.se. 7200	IN	A	91.201.60.166
```

### NS-auktoritativ kontroll
```
NS: dns1.oderland.com.
markishelsingborg.se.	7200	IN	A	91.201.60.166
markishelsingborg.se.	7200	IN	MX	1 mx2.oderland.com.
markishelsingborg.se.	7200	IN	MX	1 mx4.oderland.com.
markishelsingborg.se.	7200	IN	MX	1 mx1.oderland.com.
markishelsingborg.se.	7200	IN	MX	1 mx3.oderland.com.
```
