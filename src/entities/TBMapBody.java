package entities;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class TBMapBody {
    @XmlElement String state;
    @XmlElement String TestBed;
    @XmlElement String TBUsername;
    @XmlElement String TStart;
    @XmlElement String TEnd;
    @XmlElement String Comments;

}
